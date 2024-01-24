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

1. Reverting a migration

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
1. Find the migration that you executed but want to delete in the `_prisma_migrations` table in the database
2. Delete the entries from the table

## When graph schema changes
Whenever anything changes in the graph schema, you need to 
1) run `yarn graphql:generate` to generate the typescript types. This will generate the types in `src/graphql/generated/graphql.ts`. 
2) Now this "New" schema should be downloaded by the UI to generate the typescript types on its side
3) For UI to download the schema run `yarn graphql:download` in the UI project. This will download the schema from the backend.
4) After you download the schema, run `yarn graphql:generate` to generate on the UI project.
5) You might get some error if you have renamed a field or removed a field because it needs be updated in the UI graphql files also.
