# Main Operations

While working on a project, you will be doing the following operations:

1. Add a new API endpoint
2. Adding a new graphql query - This is used to fetch data
3. Adding a new field to an existing graphql query
4. Adding a new graphql mutation - This is used to create, update or delete data
5. Adding a new database model (prisma model)
6. Adding a new field to an existing database model
7. Removing a field from an existing database model

# Some other important operations

## Add a new GraphQL Mutation (Create, Update, Delete)

1. Add the new mutation to the one of the .gql files
2. We have a separate file for each type of mutation. For example, if you are adding a new mutation related to space, add it to the space.gql file
3. Lets take an example of adding a new mutation to Copy All Bytes from Git to Database . For this add this entry to `copyAllBytesFromGitToDatabase` mutations type in `space.gql` file
4. After you add the new mutation, run `yarn graphql:generate` to generate the typescript types. This will generate the types in `src/graphql/generated/graphql.ts`. These types prevent us from writing a lot of code manually.
5. Now you can add your mutation function in `src/graphql/mutations/space/copyAllBytesFromGitToDatabase.ts`. We normally create a new file for each mutation.
6. The signature will look like this

```ts
import { MutationCopyAllBytesFromGitToDatabaseArgs } from '@/graphql/generated/graphql';
import { IncomingMessage } from 'http';

export default function copyAllBytesFromGitToDatabase(_: unknown, args: MutationCopyAllBytesFromGitToDatabaseArgs, context: IncomingMessage) {}
```

7. Add all the code that needs to be performed in this function. You can use the `args` variable to access the arguments passed to the mutation. You can use the `context` variable to access the current user.
8. After you add the mutation, you need to add the resolver to the `src/mutations.ts` file.

## Removing a field from an existing database model

1. Remove the field from the prisma model in `prisma/schema.prisma`
2. Run `yarn prisma:generate` to generate the prisma client
3. Now create a migration by running `npx prisma migrate dev --create-only`. This will create a new migration file in `prisma/migrations`
4. Now run `npx prisma migrate dev` to apply the migration to your local database
5. You can now remove the field from the graphql file in one of the .gql files
6. Now run `yarn graphql:generate` to generate the typescript types
7. Compile everything by running `yarn tsc` and then test it with the UI
8. Important: UI can fail to load if a field is removed from the backed which is being used in the UI. So make sure to remove the field from the UI first.

## Reverting a migration

There are two ways to revert the changes you made to the database:
1. Add a new update migration that reverts the changes - This is used if the migration is already applied to the production database
2. Delete the migration - This is used if the migration is not applied to the production database and the pull request is not merged yet.
This prevent an additional migration row in the database.

#### How migration works:
1. When you run `npx prisma migrate dev`, it creates a new migration file in the `prisma/migrations` folder
2. It also adds an entry in the `_prisma_migrations` table in the database
3. If prisma detects that the _prisma_migrations table is not in sync with the migrations folder, it will ask to reset the database and re-run all the migrations


#### Deleting a migration:
1. Find the entry of the migration that you executed but want to delete in the `_prisma_migrations` table in the database. We want to just delete that specific migration.
2. Delete the entries(columns, rows, or tables) from the database corresponding to the migration you just deleted
   Deleting the columns, rows, or tables from the database is important because if you don't delete them, the next migration will fail
3. Delete the migration file from the `prisma/migrations` folder.
4. Now you can run `npx prisma migrate dev` again to create a new migration


## How we fetch data from git

We use Git to get data like courses, guides and timelines etc. The main reason is to avoid copyright problems. Putting the data in a public repos helps everyone access it while still following the law. This way, people can work together on educational stuff without breaking any copyright rules. It's a smart way to share resources and collaborate. Following video explains why and how we use git for data fetching:

Video Link: [How we fetch data from git?](https://drive.google.com/file/d/1f4lhEdBS322FEuo0R_uNx-UrWumQAQwm/view?usp=sharing):
