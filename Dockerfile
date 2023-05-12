# Use the official Node.js 18 image as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Install Python, pip, and other necessary packages
RUN apt-get update && \
    apt-get install -y python3 python3-distutils wget

# Install Amazon EFS mount helper (amazon-efs-utils) from GitHub
RUN apt-get install -y nfs-common git binutils && \
    git clone https://github.com/aws/efs-utils && \
    cd efs-utils && \
    ./build-deb.sh && \
    apt-get install -y ./build/amazon-efs-utils*deb

# Install Amazon SSM Agent
RUN wget https://s3.amazonaws.com/ec2-downloads-windows/SSMAgent/latest/debian_amd64/amazon-ssm-agent.deb -O /tmp/amazon-ssm-agent.deb && \
    dpkg -i /tmp/amazon-ssm-agent.deb && \
    rm /tmp/amazon-ssm-agent.deb

# Install Amazon SSM Agent
RUN apt-get install -y supervisor

# Expose the port your application uses
EXPOSE 8000

# Create log directory for the application
RUN mkdir -p /var/log

# Add custom supervisord.conf
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm i

# Copy the rest of the application code to the container
COPY . .

# Expose the port your application uses
EXPOSE 8000

# Start the application
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]
