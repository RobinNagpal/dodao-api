import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeTypeDefs } from '@graphql-tools/merge';
import { json } from 'body-parser';
import cors from 'cors';
import express from 'express';
import * as path from 'path';
import Mutation from './mutations';
import Query from './queries';
import resolvers from './resolvers';

const typesArray = loadFilesSync(path.join(__dirname, './graphql'), { extensions: ['gql'] });

const typeDefs = mergeTypeDefs(typesArray);

const app = express();

(async () => {
  const rootValue = { Mutation, Query, ...resolvers };

  const server = new ApolloServer({ typeDefs, resolvers: rootValue, plugins: [] });

  await server.start();

  app.use(
    '/graphql',
    cors<cors.CorsRequest>({
      origin: '*', // Replace '*' with a specific domain if you want to restrict the allowed origins
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    }),
    json(),
    expressMiddleware(server)
  );

  app.use('/health', (req, res) => {
    return res.status(200).send('OK');
  });

  app.listen({ port: 8000 }, () => console.log(`🚀 Server ready at http://localhost:8000/graphql`));
})();
