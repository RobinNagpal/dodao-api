# Use the official Node.js 18 image as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application code to the container
COPY . .

# Compile TypeScript
RUN npm run build

# Expose the port your application uses
EXPOSE 8000

# Start the application
CMD ["npm", "start"]
