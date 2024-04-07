# Use an official Python runtime as the base image
FROM python:3.11

# Set the working directory in the container
WORKDIR /app

# Copy the requirements file to the working directory
COPY requirements.txt .

# Install the Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the api_pinecone.py file and other necessary files to the working directory
COPY ./api/api_pinecone.py .

# Expose the port on which the Flask app will run 
EXPOSE 5000

# Set the command to run the Flask app
CMD ["python", "./api/api_pinecone.py"]