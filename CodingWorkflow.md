# Main Operations
While working on a project, you will be doing the following operations:
1. Add a new API endpoint
2. Adding a new graphql query - This is used to fetch data
3. Adding a new field to an existing graphql query
4. Adding a new graphql mutation - This is used to create, update or delete data
5. Adding a new database model (prisma model)
6. Adding a new field to an existing database model


## Add a new GraphQL Mutation (Create, Update, Delete)
1. Add the new mutation to the one of the .gql files
2. We have a separate file for each type of mutation. For example, if you are adding a new mutation related to space, add it to the space.gql file
3. Lets take an example of adding a new mutation to Copy All Bytes from Git to Database . For this add this entry to `copyAllBytesFromGitToDatabase` mutations type in `space.gql` file
4. After you add the new mutation, run `yarn graphql:generate` to generate the typescript types. This will generate the types in `src/graphql/enerated/graphql.ts`. These types prevent us from wiring a lot of code manually.
5. Now you can add your mutation function in `src/graphql/mutations/space/copyAllBytesFromGitToDatabase.ts`. We normally create a new file for each mutation.
6. The signature will look like this
```ts
import { MutationCopyAllBytesFromGitToDatabaseArgs } from '@/graphql/generated/graphql';
import { IncomingMessage } from 'http';

export default function copyAllBytesFromGitToDatabase(_: unknown, args: MutationCopyAllBytesFromGitToDatabaseArgs, context: IncomingMessage) {}
```
7. Add all the code that needs to be performed in this function. You can use the `args` variable to access the arguments passed to the mutation. You can use the `context` variable to access the current user.
8. After you add the mutation, you need to add the resolver to the `src/mutations.ts` file.
