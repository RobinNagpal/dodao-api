# Use the official Node.js 18 image as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Install Python, pip, and other necessary packages
RUN apt-get update && \
    apt-get install -y python3 python3-distutils wget && \
    if echo $(python3 -V 2>&1) | grep -e "Python 3.6"; then \
        wget https://bootstrap.pypa.io/pip/3.6/get-pip.py -O /tmp/get-pip.py; \
    elif echo $(python3 -V 2>&1) | grep -e "Python 3.5"; then \
        wget https://bootstrap.pypa.io/pip/3.5/get-pip.py -O /tmp/get-pip.py; \
    elif echo $(python3 -V 2>&1) | grep -e "Python 3.4"; then \
        wget https://bootstrap.pypa.io/pip/3.4/get-pip.py -O /tmp/get-pip.py; \
    else \
        wget https://bootstrap.pypa.io/get-pip.py -O /tmp/get-pip.py; \
    fi && \
    python3 /tmp/get-pip.py && \
    rm /tmp/get-pip.py && \
    pip3 install botocore

# Install Amazon EFS mount helper (amazon-efs-utils)
RUN apt-get install -y nfs-common \
    && curl -o /tmp/amazon-efs-utils.deb https://amazon-efs-utils.s3.amazonaws.com/amazon-efs-utils-latest.deb \
    && apt-get install -y /tmp/amazon-efs-utils.deb \
    && rm /tmp/amazon-efs-utils.deb

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application code to the container
COPY . .

# Expose the port your application uses
EXPOSE 8000

# Start the application
CMD ["npm", "start"]
