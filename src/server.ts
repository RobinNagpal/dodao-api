import { setupGitLoader } from '@/helpers/gitLoader';
import { GraphqlContext } from '@/types/GraphqlContext';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware, ExpressContextFunctionArgument } from '@apollo/server/express4';
import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeTypeDefs } from '@graphql-tools/merge';
import { json } from 'body-parser';
import cors from 'cors';
import express from 'express';
import { GraphQLFormattedError } from 'graphql/error';
import { IncomingHttpHeaders } from 'http';
import * as path from 'path';
import Mutation from './mutations';
import Query from './queries';
import resolvers from './resolvers';
import { GraphQLDateTimeISO } from 'graphql-scalars';

const typesArray = loadFilesSync(path.join(__dirname, './graphql'), { extensions: ['gql'] });

const typeDefs = mergeTypeDefs(typesArray);

const app = express();

(async () => {
  const rootValue = { Mutation, Query, ...resolvers, DateTimeISO: GraphQLDateTimeISO };

  const server = new ApolloServer({
    typeDefs,
    resolvers: rootValue,
    plugins: [],
    formatError: (formattedError: GraphQLFormattedError, error: unknown) => {
      console.error(error);
      return formattedError;
    },
  });

  await server.start();

  const context = async ({ req, res }: ExpressContextFunctionArgument): Promise<{ ip: string; headers: IncomingHttpHeaders }> => {
    return { headers: req.headers, ip: req.ip };
  };

  app.use('/graphql', cors<cors.CorsRequest>(), json(), expressMiddleware(server, { context }));

  app.use('/health', (req, res) => {
    return res.status(200).send('5');
  });

  setupGitLoader();

  app.listen({ port: 8000 }, () => console.log(`🚀 Server ready at http://localhost:8000/graphql`));
})();
