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

# Install Amazon EFS mount helper (amazon-efs-utils) from GitHub
RUN apt-get install -y nfs-common git binutils && \
    git clone https://github.com/aws/efs-utils && \
    cd efs-utils && \
    ./build-deb.sh && \
    apt-get install -y ./build/amazon-efs-utils*deb

# Install SSM Agent
RUN curl https://s3.amazonaws.com/ec2-downloads-windows/SSMAgent/latest/debian_amd64/amazon-ssm-agent.deb -o /tmp/amazon-ssm-agent.deb && \
    dpkg -i /tmp/amazon-ssm-agent.deb && \
    rm /tmp/amazon-ssm-agent.deb

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application code to the container
COPY . .

# Expose the port your application uses
EXPOSE 8000

# Create a supervisord configuration file
RUN mkdir -p /etc/supervisor/conf.d && \
    echo "[supervisord]\nnodaemon=true\n\n\
[program:ssm-agent]\ncommand=/usr/bin/amazon-ssm-agent start\n\n\
[program:app]\ncommand=npm start\n" > /etc/supervisor/conf.d/supervisord.conf

# Expose the port your application uses
EXPOSE 8000

# Start supervisord
CMD ["/usr/bin/supervisord"]
