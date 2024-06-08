# Use a base image with Python and necessary dependencies
FROM python:3.10.11-slim

# Set the working directory inside the container
WORKDIR /app

# Update the package lists and install required packages
RUN apt-get update && \
  apt-get install -y --no-install-recommends \
  libgl1-mesa-glx \
  libglib2.0-0 \
  python3-venv \
  && rm -rf /var/lib/apt/lists/*

# Create and activate a virtual environment
RUN python3 -m venv /venv
ENV PATH="/venv/bin:$PATH"

# Copy the requirements file and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the application code into the container
COPY . .

# Expose the port on which the application will run
EXPOSE 8080

# Set the entrypoint to run the application using gunicorn
CMD ["gunicorn", "-b", "0.0.0.0:8080", "index:app"]
