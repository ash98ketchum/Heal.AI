# Use Python 3.10 base image
FROM python:3.10-slim

# Install Node.js
RUN apt-get update && apt-get install -y nodejs npm

# Set working directory
WORKDIR /app

# Copy files
COPY . .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Install Node dependencies
RUN npm install

# Expose port
EXPOSE 5000

# Start server
CMD ["node", "server.cjs"]
