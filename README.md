
# Project Title

This is a backend framework and provides robust APIs to access extensive guides, bytes, and more from your database.

## Prerequisites

Before you begin, ensure you have met the following requirements:

* You have installed Node.js (version 18 or above)
* You have a Yarn package manager installed
* Docker and Docker Compose are installed on your machine

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes:

1. **Clone the repository**

    Clone the repository to your local machine.
    
    ```bash
    git clone https://github.com/RobinNagpal/dodao-api.git
    ```

2. **Install dependencies**

    Navigate to the project directory and run the following command to install the necessary packages:
    
    ```bash
    yarn install
    ```

3. **Setup environment variables**

    Copy the appropriate environment variables from the `.env.example` file and modify them as needed. Assign a file path from your local machine to `MAIN_GIT_FOLDER_PATH`.

4. **Run Docker**

    Make sure Docker is running, then start your services using Docker Compose:

    ```bash
    docker-compose up
    ```

5. **Generate Prisma Client**

    Run the following command to generate your Prisma Client:

    ```bash
    npx prisma generate
    ```

6. **Start the development server**

    Now you're ready to start the development server:

    ```bash
    yarn run dev
    ```

You should now be able to access the GraphQL server at [http://localhost:8000/graphql](http://localhost:8000/graphql).
