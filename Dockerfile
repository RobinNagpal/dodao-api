# Use the official Node.js 18 image as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm ci

# Install system dependencies
RUN apt-get update && \
    apt-get install -y \
    python3-pip \
    nfs-common \
    git

# Install EFS utilities from the GitHub repository
RUN git clone https://github.com/aws/efs-utils && \
    cd efs-utils && \
    ./build-deb.sh && \
    apt-get install -y ./build/amazon-efs-utils*deb && \
    cd .. && \
    rm -rf efs-utils

# Install botocore
RUN pip3 install \
    botocore

# Copy the rest of the application code to the container
COPY . .

# Expose the port your application uses
EXPOSE 8000

# Start the application
CMD ["npm", "start"]
