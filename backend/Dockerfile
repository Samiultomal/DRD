# Use an official Python image as a parent image
FROM python:3.10

# Set the working directory in the container
WORKDIR /app

# Install system dependencies needed for MySQL client (use MariaDB client instead of MySQL)
RUN apt-get update && \
    apt-get install -y \
    build-essential \
    libmariadb-dev \
    pkg-config \
    && rm -rf /var/lib/apt/lists/*

# Copy the requirements file into the container
COPY requirements.txt /app/

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application into the container
COPY . /app/

# Command to run your app
CMD ["python", "app.py"]
