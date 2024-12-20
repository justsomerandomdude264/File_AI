from typing import Dict
import openai
import os

# Class including all functions related to ChatGPT API
class GPTFunctions:
    def __init__(self, client: openai.OpenAI = openai.OpenAI(api_key=os.getenv("OPENAI_API_KEY"))):
        print("OpenAI Api Key initiated")
        self.client = client

    def generate_initial_content(self, prompt: str) -> Dict[str, str]:
        print("Using Api Key")
        """
        Generate initial content based on user prompt.
        Returns content in a structured format suitable for frontend editing.
        """
        system_message = """Generate detailed content based on the user's prompt, optimized for LaTeX conversion. Your response should be flexible to handle ANY type of LaTeX document, including but not limited to:

        DOCUMENT TYPES:
        - Academic papers, articles, reports
        - Letters (formal, informal, business)
        - Resumes/CVs
        - Presentations/slides
        - Books/manuscripts
        - Mathematical documents
        - Technical documentation
        - Thesis/dissertation
        - Business documents
        - Newsletters
        - Contracts/legal documents

        STRUCTURAL ELEMENTS:
        - Title/headers
        - Sections and subsections
        - Tables and lists
        - Equations and formulas
        - Theorems and proofs
        - Footnotes and citations
        - Table of contents
        - Bibliographies
        - Appendices
        - Indices

        FORMATTING CAPABILITIES:
        - Typography (font styles, sizes)
        - Multi-column layouts
        - Page numbering
        - Custom margins/spacing
        - Headers and footers
        - Cross-references
        - Custom environments
        - Text alignment
        - Color formatting
        - Page layouts

        Format the content with clear structure that can be easily edited. Include appropriate sectioning based on the document type requested.

        For visual elements (charts, diagrams, etc.), provide clear text descriptions of what should be generated using native LaTeX packages (tikz, pgf-pie, etc.).

        If the user doesn't specify a document type, default to a standard article format with:
        - Title
        - Introduction
        - Main content sections
        - Conclusion"""

        try:
            # response = self.client.chat.completions.create(
            #     model="gpt-3.5-turbo-0125",
            #     messages=[
            #         {"role": "system", "content": system_message},
            #         {"role": "user", "content": prompt}
            #     ],
            #     temperature=0.7,
            #     max_tokens=2000
            # )
            
            return {
                "status": "success",
                "content": """Title Page:
- Title: Creating and Manipulating Excel Files with Python
- Subtitle: Using the `openpyxl` Library for Excel Automation
- Author: Alex Doe
- Date: October 2024

Table of Contents:
1. Introduction
2. Prerequisites
3. Installation of Required Libraries
4. Code for Creating a Basic Excel File
5. Explanation of Code Components
6. Conclusion
7. References

Content:

1. Introduction
In recent years, automation of repetitive tasks has become increasingly valuable in data analysis and reporting. One of the commonly automated tasks involves creating and modifying Excel files programmatically. This document provides a comprehensive overview of how to use Python's `openpyxl` library to perform these tasks.

2. Prerequisites
Before proceeding, the reader should have a basic understanding of Python programming and familiarity with Excel.

3. Installation of Required Libraries
The primary library required for this tutorial is `openpyxl`. To install it, run the following command in your terminal:
    pip install openpyxl

4. Code for Creating a Basic Excel File
This section provides Python code to create a simple Excel file and populate it with data. The code can be easily adapted for other applications requiring automated Excel manipulation.

5. Explanation of Code Components
Each section of the code is explained, from creating a new workbook and worksheet to saving the file.

6. Conclusion
Automating Excel tasks using Python can greatly enhance productivity and streamline data workflows.

7. References
For more information on `openpyxl`, refer to the official documentation at https://openpyxl.readthedocs.io/."""}
        except Exception as e:
            return {"status": "error", "message": str(e)}

    def convert_to_latex(self, edited_content: str) -> Dict[str, str]:
        print("Using Api Key")
        """
        Convert the edited content into LaTeX code ready for PDF compilation.
        """
        system_message = """Convert the provided content into complete, compilable LaTeX code following these strict requirements:

        CORE REQUIREMENTS:
        1. Generate 100% self-contained LaTeX code that compiles directly to PDF
        2. Include ALL necessary packages in the preamble
        3. Use appropriate document class and structure
        4. Handle all special characters and encoding
        5. Implement proper spacing and layout

        GRAPHICS AND IMAGES:
        IMPORTANT: DO NOT include or reference external images or files
        Instead:
        ✓ USE: Native LaTeX drawing capabilities:
          - TikZ for diagrams and charts
          - pgf-pie for pie charts
          - Native tables
          - Mathematical equations
          - Custom drawings using LaTeX primitives
        ✗ DO NOT USE:
          - \includegraphics
          - External image files
          - External data files
          - Web images or URLs

        FORMATTING:
        1. Use proper LaTeX environments
        2. Implement consistent spacing
        3. Handle mathematical content correctly
        4. Use appropriate sectioning commands
        5. Include necessary definitions for custom commands

        METADATA:
        1. Set appropriate document properties
        2. Include necessary language support
        3. Configure page layout
        4. Set up headers/footers if needed

        Return ONLY the complete LaTeX code that can be directly compiled to PDF without any external dependencies."""

        try:
        #     response = self.client.chat.completions.create(
        #         model="gpt-3.5-turbo-0125",
        #         messages=[
        #             {"role": "system", "content": system_message},
        #             {"role": "user", "content": f"""
        #                 Content to convert to LaTeX:
        #                 {edited_content}
                        
        #                 Please provide complete LaTeX code that can be compiled directly to PDF.
        #             """}
        #         ],
        #         temperature=0.7,
        #         max_tokens=2000
        #     )
            
            return {
                "status": "success",
                "latex_code": r"""\documentclass{article}
\title{Creating and Manipulating Excel Files with Python}
\author{Alex Doe}
\date{October 2024}

\begin{document}

\maketitle

\tableofcontents
\newpage

\section{Introduction}
In recent years, automation of repetitive tasks has become increasingly valuable in data analysis and reporting. One commonly automated task is creating and modifying Excel files programmatically. This document provides a brief overview of how to use Python's \texttt{openpyxl} library to perform these tasks.

\section{Prerequisites}
The reader should have a basic understanding of Python programming and familiarity with Excel.

\section{Installation of Required Libraries}
The primary library required for this tutorial is \texttt{openpyxl}. To install it, use:
\begin{verbatim}
pip install openpyxl
\end{verbatim}

\section{Conclusion}
Automating Excel tasks with Python can enhance productivity and streamline data workflows.

\end{document}
"""
            }
        except Exception as e:
            return {"status": "error", "message": str(e)}

    def generate_excel_code(self, query: str) -> Dict[str, str]:
        print("Using Api Key")
        """
        Generate Python code for creating Excel reports based on the query.
        Returns complete, runnable code using openpyxl.
        
        Args:
            query: User's query describing the desired Excel report
            
        Returns:
            Dict containing the generated code or error message
        """
        system_message = """You are an AI Chatbot designed to generate Python code for Excel reports using the openpyxl library.
        When generating code, follow these requirements:

        1. Include ALL necessary imports
        2. Create complete, runnable code
        3. Include proper error handling
        4. Add comments explaining key steps
        5. Format data appropriately
        6. Include both table creation and chart generation
        7. Use best practices for openpyxl
        8. Handle file saving safely
        9. Include data validation where appropriate
        10. Format cells and charts professionally
        11. Include the code in ```excel_code_python ```

        DO NOT:
        - Make assumptions about undefined variables
        - Use external dependencies beyond standard libraries and openpyxl
        - Leave any code incomplete
        - Skip error handling
        """

        try:
            # response = self.client.chat.completions.create(
            #     model="gpt-3.5-turbo-0125",
            #     messages=[
            #         {"role": "system", "content": system_message},
            #         {"role": "user", "content": query}
            #     ],
            #     temperature=0.7,
            #     max_tokens=2000
            # )
            
            # # Extract code from response
            # content = response.choices[0].message.content
            
            # # Find the code block
            # code_start = content.find("```excel_code_python")
            # if code_start == -1:
            #     code_start = content.find("```")
            # code_start = content.find("\n", code_start) + 1
            
            # code_end = content.find("```", code_start)
            # if code_end == -1:
            #     code_end = len(content)
                
            # excel_code = content[code_start:code_end].strip()
            
            return {
                "status": "success",
                "excel_code": """from openpyxl import Workbook

# Create a new workbook and select the active worksheet
wb = Workbook()
ws = wb.active

# Set the title for the worksheet
ws.title = "Sample Sheet"

# Add some data to the worksheet
ws["A1"] = "ID"
ws["B1"] = "Name"
ws["C1"] = "Score"

# Sample data
data = [
    (1, "Alice", 85),
    (2, "Bob", 92),
    (3, "Charlie", 78)
]

# Append rows of data
for row in data:
    ws.append(row)

# Save the workbook
wb.save("sample.xlsx")
""",
            }
        except Exception as e:
            return {"status": "error", "message": str(e)}