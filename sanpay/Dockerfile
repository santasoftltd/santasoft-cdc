# Use an official Python runtime as a parent image
FROM python:3.10-slim

# Set the working directory inside the container
WORKDIR /app

# Install system dependencies (including ODBC driver)
RUN apt-get update && apt-get install -y \
    gcc \
    g++ \
    gnupg \
    unixodbc \
    unixodbc-dev \
    libpq-dev \
    libsasl2-dev \
    libssl-dev \
    libffi-dev \
    curl \
    apt-transport-https \
    && curl https://packages.microsoft.com/keys/microsoft.asc | apt-key add - \
    && curl https://packages.microsoft.com/config/debian/10/prod.list > /etc/apt/sources.list.d/mssql-release.list \
    && apt-get update && ACCEPT_EULA=Y apt-get install -y msodbcsql17 \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Copy the current directory contents into the container at /app
COPY . /app

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Set environment variables for Django
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV environment=development

# Collect static files
# RUN python manage.py collectstatic --noinput

# Expose port 8000 (the default port for Django)
EXPOSE 8000

# Run migrations and start the Django development server
# CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
# Gunicorn to serve Django
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "config.wsgi:application", "--workers", "3"]