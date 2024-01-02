# Project Title

This is a backend framework and provides robust APIs to access extensive guides, bytes, and more from your database.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- You have installed Node.js (version 18 or above)
- You have a Yarn package manager installed
- Docker and Docker Compose are installed on your machine
- You have installed Postgres and done with its setup

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes:

1.  **Clone the repository**

    Clone the repository to your local machine.

    ```bash
    git clone https://github.com/RobinNagpal/dodao-api.git
    ```

2.  **Install dependencies**

    Navigate to the project directory and run the following command to install the necessary packages:

    ```bash
    yarn install
    ```

3.  **Setup environment variables**

    - Rename the `.env.example` file to `.env` and modify the keys as needed.
    - Make sure to update `DATABASE_URL` according to your own postgres username and password:

    ```bash
        postgresql://<username>:<password>@localhost:5432/next_app_localhost_db?sslmode=verify-full
    ```

    - Assign a file path from your local machine to an empty folder in `MAIN_GIT_FOLDER_PATH` key.

      For example:

      if you have cloned the repo in directory e.g. `D:\DoDao`, create an empty folder `dodao-api-git` in the same directory and update the key `MAIN_GIT_FOLDER_PATH` to `D:\DoDao\dodao-api-git`.

    - Make sure `NEXTAUTH_SECRET` & `DODAO_AUTH_SECRET` have the same keys as present in `.env` of `dodao-ui` project
    - Create a new key `NODE_ENV` and set its value to `local` like so `NODE_ENV=local`
    - Create a new key `DODAO_SUPERADMINS` and set its value to your own MetaMask key and comma separated email address.

      For example: `DODAO_SUPERADMINS = 0x0000000000000000000000000000000000000000, johndoe@gmail.com`

    - Assign random string values to the remaining empty keys.

4.  **Run Docker**

    Make sure Docker Desktop is running, then start your services using Docker Compose:

    ```bash
    docker-compose up
    ```

5.  **Generate Prisma Client**

    Run the following command to generate your Prisma Client:

    ```bash
    npx prisma generate
    ```

6.  **Generate Prisma Migrations**

    Run the following command to generate your Prisma Migrations:

    ```bash
    npx prisma migrate dev
    ```

7.  **Insert into Postgres**

    Copy the **insert** commands from `init.sql` file and run them into your Postgres, to insert data.

8.  **Start the development server**

    Now you're ready to start the development server:

    ```bash
    yarn dev
    ```

You should now be able to access the GraphQL server at [http://localhost:8000/graphql](http://localhost:8000/graphql).
