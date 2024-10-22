# Imports
from rest_framework.decorators import api_view
from .gpt_functions import xl_query, pdf_query
from rest_framework.response import Response
from rest_framework import status
from django.http import FileResponse, HttpResponse
from openpyxl import Workbook
import os
import subprocess
import uuid
import re
import io

# API request to get a excel file made according to the query (GET request only)
@api_view(['GET'])
def xl_request(request):
    try:
        # Get the query (prompt) from the request
        chatgpt_query = request.query_params.get('query', '')
        if not chatgpt_query:
            return Response({"error": "No query provided"}, status=status.HTTP_400_BAD_REQUEST)

        # Run the query and get the Excel-related Python code from chatgpt
        xl_code = xl_query(chatgpt_query)
        
        # Change the output from saving the file to drive to instead saving it in the memory and returning it to avoid temp files
        # Use regex to find and capture the filename in wb.save("filename.xlsx")
        save_pattern = r'wb\.save\(["\'](.+?)["\']\)'
        match = re.search(save_pattern, xl_code)

        if match:
            # Extract the filename from the match
            filename = match.group(1)

            # Replace wb.save("filename.xlsx") with wb.save(output)
            xl_code = re.sub(save_pattern, 'wb.save(output)', xl_code)
        else:
            # Default filename if no match is found
            filename = "generated_excel.xlsx"

        # Create an in-memory output file for the Excel workbook
        output = io.BytesIO()

        # Dynamically execute the code
        exec(xl_code, {"output": output, "io": io, "Workbook": Workbook})

        # Ensure the pointer is at the beginning of the BytesIO object
        output.seek(0)

        # Check if workbook was actually created (non-empty output)
        if output.getbuffer().nbytes == 0:
            return Response({"error": "Workbook generation failed or workbook is empty."}, 
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        # Return the Excel file as an HTTP response with the captured filename
        response = HttpResponse(output, content_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
        response['Content-Disposition'] = f'attachment; filename="{filename}"'

        return response

    except (KeyError, ValueError) as e:
        # Handle specific errors (like missing keys, invalid values)
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    except Exception as e:
        # General error handling
        return Response({"error": f"An error occurred: {str(e)}"}, 
                        status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# API request to get a pdf file made using latex according to the query (GET request only)
@api_view(['GET'])
def pdf_request(request):
    try:
        # Get the query from the request
        query = request.query_params.get('query', '')
        if not query:
            return Response({"error": "No query provided"}, status=status.HTTP_400_BAD_REQUEST)

        # Get the LaTeX code according to the query
        latex_code = pdf_query(query)

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

            # Run pdflatex to convert latex to pdf
            process = subprocess.run(
                ['pdflatex', '-output-directory', api_temp_dir, tex_file],
                check=True, 
                stdout=subprocess.PIPE, 
                stderr=subprocess.PIPE,
                text=True,
                timeout=15
            )

            # Check if PDF was created
            if not os.path.exists(pdf_file):
                return Response({"error": "PDF file was not created"}, 
                                status=status.HTTP_500_INTERNAL_SERVER_ERROR)

            # Return the PDF file as a FileResponse
            response = FileResponse(open(pdf_file, 'rb'), content_type='application/pdf')
            response['Content-Disposition'] = f'attachment; filename="{file_name}.pdf"'

            # Clean up temporary files in a separate process
            subprocess.Popen(['python', '-c', f"import os, time; time.sleep(1); os.remove(r'{pdf_file}'); os.remove(r'{tex_file}'); os.remove(r'{aux_file}'); os.remove(r'{log_file}');"])

            return response
        
        except subprocess.CalledProcessError as e:
            # Handle errors related to pdflatex execution
            return Response({
                "error": f"PDF generation failed: {e}",
                "stdout": e.stdout,
                "stderr": e.stderr
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        except subprocess.TimeoutExpired:
            # Handle timeout error (related to pdflatex)
            subprocess.Popen(['python', '-c', f"import os, time; time.sleep(1); os.remove(r'{tex_file}'); os.remove(r'{log_file}');"])
            return Response({
                "error": "PDF generation took too long. Please refine your query or prompt."
            }, status=status.HTTP_504_GATEWAY_TIMEOUT)

    except (KeyError, ValueError) as e:
        # Handle specific errors (like missing keys, invalid values)
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    except Exception as e:
        # General error handling
        return Response({"error": f"An error occurred: {str(e)}"}, 
                        status=status.HTTP_500_INTERNAL_SERVER_ERROR)