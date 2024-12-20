# Use official Python image as the base image
FROM python:3.11-slim

# Set the working directory in the container
WORKDIR /app

# Install system dependencies for MySQL and pdflatex
RUN apt-get update && apt-get install -y \
    libssl-dev \
    default-libmysqlclient-dev \
    build-essential \
    gcc \
    texlive-latex-base \
    texlive-fonts-recommended \
    texlive-latex-recommended \
    texlive-latex-extra \
    dvipng \
    cm-super \
    --no-install-recommends && \
    rm -rf /var/lib/apt/lists/*
RUN apt-get update && apt-get install -y pkg-config

# Copy the entire project
COPY . .

# Update Pip
RUN pip install --upgrade pip setuptools wheel

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Install gunicorn
RUN pip install gunicorn 

# Create a user to run the application
RUN groupadd -r appgroup && useradd -r -g appgroup appuser

# Set user permissions
RUN chown -R appuser:appgroup /app

# Switch to the new user
USER appuser

# Expose the Gunicorn default port
EXPOSE 8000

# Set environment variables
ENV DJANGO_SETTINGS_MODULE=backend.settings
ENV PYTHONPATH=/app
ENV DJANGO_ENV=production
ENV PYTHONUNBUFFERED=1

# Command in docker compose