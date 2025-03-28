from django.http import FileResponse
from django.utils import timezone

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from user_auth.models import UserTokenAuth
from .gpt_functions import GPTFunctions

from openpyxl import Workbook
import os
import subprocess
import uuid
import logging
import re
import io

# Initialize logger
logger = logging.getLogger(__name__)


# Initialize GPTFunctions class
gpt_functions = GPTFunctions(
    test=True # Will not use api, will give example outputs to save tokens, set as False for production enviroment
)


# Utility Functions

def is_user_verfied(token_obj: UserTokenAuth) -> bool:
    """Check if the user has verified both email and phone."""
    return token_obj.email_verified and token_obj.phone_verified

def limit_requests(token_obj: UserTokenAuth) -> bool:
    """Limit users to 3 requests per day."""
    today = timezone.now().date()
    if token_obj.last_request_date != today:
        token_obj.request_count = 1
        token_obj.last_request_date = today
        token_obj.save()
        return True

    elif token_obj.request_count >= 3:
        return False    
    
    else:
        token_obj.request_count = token_obj.request_count + 1
        token_obj.save()
        return True
    
def validate_token(token: str) -> UserTokenAuth | bool:
    """Validate the user's token."""
    try:
        token_obj = UserTokenAuth.objects.get(token=token)
        return token_obj
    except UserTokenAuth.DoesNotExist:
        return False



# API Views

@api_view(['POST'])
def xl_request(request):
    """Generate and return an Excel file based on a user prompt."""
    try:
        prompt = request.data.get("query", "").strip()
        token = request.data.get("token", "").strip()
        test = True if int(os.getenv("TEST")) == 1 else False

        if not prompt:
            return Response({"error": "No prompt provided"}, status=status.HTTP_400_BAD_REQUEST)
        
        token_obj = validate_token(token)
        if not token_obj:
            return Response({"error": "Token is invalid"}, 
                            status=status.HTTP_401_UNAUTHORIZED)
        
        if not is_user_verfied(token_obj):
            return Response({"error": "You have not verified your account please go through verfication: \n Delete this account and Remake it WITH OTP VERIFICATION OF BOTH PHONE AND EMAIL"}, 
                            status=status.HTTP_403_FORBIDDEN)

        if not limit_requests(token_obj) :
            return Response({"error": "You have ran out of the 3 daily requests, Try again tommorow."}, 
                            status=status.HTTP_403_FORBIDDEN)

        result = gpt_functions.generate_excel_code(prompt, test)
    
        if not (result['status'] == 'success'):
            logger.error(result["message"])
            return Response(
                {"error": result["message"]}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
        
        xl_code = result["excel_code"]

        # Change the output from saving the file to drive, to instead saving it in the memory and returning it thus to avoid temp files
        # Use regex to find and capture the filename in wb.save("filename.xlsx")
        save_pattern = r'wb\.save\(["\'](.+?)["\']\)'
        match = re.search(save_pattern, xl_code)

        if match:
            filename = match.group(1)
            xl_code = re.sub(save_pattern, 'wb.save(output)', xl_code)
        else:
            filename = "excel.xlsx"

        output = io.BytesIO()
        exec(xl_code, {"output": output, "io": io, "Workbook": Workbook})
        # Ensure the pointer is at the beginning of the BytesIO object
        output.seek(0)

        # Check if workbook was actually created (non-empty output)
        if output.getbuffer().nbytes == 0:
            return Response({"error": "Workbook generation failed or workbook is empty."}, 
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        response = FileResponse(output, content_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
        response['Content-Disposition'] = f'attachment; filename="{filename}"'

        return response

    except Exception as e:
        return Response({"error": f"An error occurred: {str(e)}"}, 
                        status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# API request to get a pdf file made using latex according to the content 
@api_view(['POST'])
def pdf_request(request):
    """Generate a PDF file based on user's content and return it."""
    try:
        content = request.data.get('content', '')
        token = request.data.get("token", "").strip()
        test = True if int(os.getenv("TEST")) == 1 else False

        if not content:
            return Response({"error": "No content provided"}, status=status.HTTP_400_BAD_REQUEST)
    
        token_obj = validate_token(token)
        if not token_obj:
            return Response({"error": "Token is invalid"}, status=status.HTTP_401_UNAUTHORIZED)

        if not is_user_verfied(token_obj):
            return Response({"error": "You have not verified your account please go through verfication: \n Delete this account and Remake it WITH OTP VERIFICATION OF BOTH PHONE AND EMAIL"}, 
                            status=status.HTTP_403_FORBIDDEN)

        if not limit_requests(token_obj) :
            return Response({"error": "You have ran out of the 3 daily requests, Try again tommorow."}, 
                            status=status.HTTP_403_FORBIDDEN)

        result = gpt_functions.convert_to_latex(content, test)

        if not (result['status'] == 'success'):
            logger.error(result["message"])
            return Response(
                {"error": result["message"]}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

        latex_code = result["latex_code"]

        # Ensure api_temp directory exists
        api_temp_dir = os.path.join(os.path.dirname(__file__), 'api_temp')
        os.makedirs(api_temp_dir, exist_ok=True)

        # Generate a unique filename (without extension)
        unique_id = uuid.uuid4()
        file_name = f'output_{unique_id}'
        tex_file = os.path.join(api_temp_dir, f'{file_name}.tex')
        pdf_file = os.path.join(api_temp_dir, f'{file_name}.pdf')
        aux_file = os.path.join(api_temp_dir, f'{file_name}.aux')
        log_file = os.path.join(api_temp_dir, f'{file_name}.log')

        try:
            # Write LaTeX code to .tex file
            with open(tex_file, 'w', encoding='utf-8') as f:
                f.write(latex_code)

            # Run pdflatex to convert latex (.tex) to pdf
            process = subprocess.run(
                ['pdflatex', '-output-directory', api_temp_dir, tex_file],
                check=True, 
                stdout=subprocess.PIPE, 
                stderr=subprocess.PIPE,
                text=True,
                timeout=15
            )

            if not os.path.exists(pdf_file):
                return Response({"error": "PDF file was not created"}, 
                                status=status.HTTP_500_INTERNAL_SERVER_ERROR)

            response = FileResponse(open(pdf_file, 'rb'), content_type='application/pdf')
            response['Content-Disposition'] = f'attachment; filename="{file_name}.pdf"'

            # Clean up temporary files in a separate process
            subprocess.Popen(['python', '-c', f"import os, time; time.sleep(1); os.remove(r'{pdf_file}'); os.remove(r'{tex_file}'); os.remove(r'{aux_file}'); os.remove(r'{log_file}');"])

            return response
        
        except subprocess.CalledProcessError as e:
            logger.error(e)
            return Response({
                "error": f"PDF generation failed: {e}",
                "stdout": e.stdout,
                "stderr": e.stderr
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        except subprocess.TimeoutExpired:
            # Delete temporary files even if a error comes
            subprocess.Popen(['python', '-c', f"import os, time; time.sleep(1); os.remove(r'{tex_file}'); os.remove(r'{log_file}');"])
            return Response({
                "error": "PDF generation took too long. Please refine your query or prompt."
            }, status=status.HTTP_504_GATEWAY_TIMEOUT)

    except Exception as e:
        logger.error(e)
        return Response({"error": f"An error occurred: {str(e)}"}, 
                        status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    

@api_view(['POST'])
def pdf_content_request(request):
    """Generate initial PDF content based on a user query."""
    try:
        prompt = request.data.get("query", "")
        token = request.data.get("token", "").strip()
        test = True if int(os.getenv("TEST")) == 1 else False

        if not prompt:
            return Response(
                {"error": "No prompt provided"}, 
                status=status.HTTP_400_BAD_REQUEST
            )

        token_obj = validate_token(token)
        if not token_obj:
            return Response({"error": "Token is invalid"}, 
                            status=status.HTTP_401_UNAUTHORIZED)

        if not is_user_verfied(token_obj):
            return Response({"error": "You have not verified your account please go through verfication: \n Delete this account and Remake it WITH OTP VERIFICATION OF BOTH PHONE AND EMAIL"}, 
                            status=status.HTTP_403_FORBIDDEN)

        if not limit_requests(token_obj):
            return Response({"error": "You have ran out of the 3 daily requests, Try again tommorow."}, 
                            status=status.HTTP_403_FORBIDDEN)

        result = gpt_functions.generate_initial_content(prompt, test)
        
        if result["status"] == "success":
            return Response(result, status=status.HTTP_200_OK)
        else:
            return Response(
                {"error": result["message"]}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    except Exception as e:
        return Response(
            {"error": f"An error occurred: {str(e)}"}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )