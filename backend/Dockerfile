# Use official Python image as the base image
FROM python:3.11-slim

# Set the working directory in the container
WORKDIR /app

# Copy the entire project
COPY . .

# Install system dependencies for pdflatex (required for PDF generation)
RUN apt-get update && apt-get install -y \
    texlive-latex-base \
    texlive-fonts-recommended \
    texlive-latex-recommended \
    texlive-latex-extra \
    dvipng \
    cm-super \
    --no-install-recommends && \
    rm -rf /var/lib/apt/lists/*

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Install gunicorn
RUN pip install gunicorn

# Expose the Gunicorn default port
EXPOSE 8000

# Set environment variables
ENV DJANGO_SETTINGS_MODULE=backend.settings
ENV PYTHONPATH=/app
ENV DJANGO_ENV=production
ENV PYTHONUNBUFFERED=1

# The command to run will be provided in the docker-compose file