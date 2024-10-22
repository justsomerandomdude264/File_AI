# Imports
from openai import OpenAI
import os

# Get the openai client with api key
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# Logging that the API key is on
print('\n---\nAPI KEY INITIATED\n---\n')

# Function to get the code required to make an excel file according to the query
def xl_query(query):
    # Logging that Excel Request has been made
    print("\n---\nExcel Request\n---\n")

    # Get response from chatgpt
    result = client.chat.completions.create(
        model="gpt-3.5-turbo-0125",
        messages=[
            {
                'role': 'system',
                'content': (
                    "You are an AI Chatbot designed to generate Python code for Excel reports using the openpyxl library and dont make silly mistakes, dont hallucinate and include all imports you used."
                    "When asked to create an Excel report, provide the complete code that includes:\n"
                    "1. Creating a table with the provided data.\n"
                    "2. Generating a chart based on that data.\n"
                    "Respond with the code formatted as a Python script in a code block:\n"
                    "```excel_code_python\n"
                    "# Your complete code here\n"
                    "```\n"
                    "Make sure to include all necessary imports, and structure the code so it can be run directly."
                )
            },
            {
                'role': 'user',
                'content': query
            }
        ],
        temperature=0.7,
        max_completion_tokens=1500
    )

    # Extract the response/message from the content
    response =  result.choices[0].message.content

    # Extract the code
    start = response.find("```excel_code_python") + len("```excel_code_python\n")
    end = response.find("```", start)
    xl_code = response[start:end].strip()

    # Reuturn the extracted code
    return xl_code

# Function toget the latex code required to compile a pdf according to the query
def pdf_query(query):
    # Logging that a PDF Request has been made
    print("---\nPDF Request\n---\n")

    # Get the response from chatgpt
    result = client.chat.completions.create(
        model="gpt-3.5-turbo-0125",
        messages=[
            {'role': 'system', 'content': """You are an AI specialized in generating LaTeX code for PDF creation. Your task is to provide complete, self-contained LaTeX code within ```latex_code_pdf tags, including all necessary packages and a comprehensive preamble. The code must be accurate, error-free, and fully compilable using MiKTeX's pdfLaTeX.

    Key requirements:
    1. Include all required packages, especially for charts and graphics (e.g., tikz, pgf-pie).
    2. Ensure the preamble is complete with everything needed for charts, images, and graphics.
    3. Use only importable graphics; do not include external images.
    4. Avoid using lipsum or example images.
    5. Use 'ht' instead of 'h' for float placement.
    6. Do not use pgfplots.
    7. Always provide the full LaTeX code, even if a PDF is not explicitly requested.
    8. Creative or placeholder content can be added if the user hasn't specified details.

    When generating charts:
    - For pie charts, ensure '\\pie' is properly imported and used.
    - For bar charts, use TikZ or other compatible packages.
    - Images assumed to be existent are stritcly prohibited do not include images only include graphics.

    The LaTeX document must be fully functional and compile without errors. Provide the complete LaTeX code within the specified tags, ready for direct compilation to PDF."""},
            {'role': 'user', 'content': query}
        ],
        temperature=0.7,
        max_tokens=1500
    )

    # Get the response/message from the content of chatgpt
    response =  result.choices[0].message.content

    # Extract the latex code
    start = response.find("```latex_code_pdf") + len("```latex_code_pdf\n")
    end = response.find("```", start)
    latex_code = response[start:end].strip()

    # Return the extracted latex code
    return latex_code