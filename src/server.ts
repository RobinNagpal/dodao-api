import { registerApiRoutes } from '@/api/registerApiRoutes';
import extendedSpace from '@/api/space/extendedSpace';
import health from '@/api/health';
import downloadGuideSubmissionsCSV from '@/api/downloadGuideSubmissionsCSV';
import { logError } from '@/helpers/errorLogger';
import { setupGitLoader } from '@/helpers/gitLoader';
import { ApolloServer, ApolloServerPlugin } from '@apollo/server';
import { ExpressContextFunctionArgument, expressMiddleware } from '@apollo/server/express4';
import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeTypeDefs } from '@graphql-tools/merge';
import { json } from 'body-parser';
import cors from 'cors';
import express from 'express';
import { GraphQLDateTimeISO } from 'graphql-scalars';
import { GraphQLFormattedError } from 'graphql/error';
import { IncomingHttpHeaders } from 'http';
import * as path from 'path';
import Mutation from './mutations';
import Query from './queries';
import resolvers from './resolvers';
import { ApolloServerPluginLandingPageGraphQLPlayground } from '@apollo/server-plugin-landing-page-graphql-playground';
import { ApolloServerPluginLandingPageDisabled } from '@apollo/server/plugin/disabled';

const typesArray = loadFilesSync(path.join(__dirname, './graphql'), { extensions: ['gql'] });

const typeDefs = mergeTypeDefs(typesArray);

const app = express();

(async () => {
  const rootValue = { Mutation, Query, ...resolvers, DateTimeISO: GraphQLDateTimeISO };

  const isLocalEnv = true; // | process?.env?.NODE_ENV === 'local';
  console.log('isLocalEnv', isLocalEnv);
  const plugin: ApolloServerPlugin = isLocalEnv ? ApolloServerPluginLandingPageGraphQLPlayground() : ApolloServerPluginLandingPageDisabled();

  const server = new ApolloServer({
    typeDefs,
    resolvers: rootValue,
    plugins: [plugin],

    formatError: (formattedError: GraphQLFormattedError, error: unknown) => {
      console.error(error);
      logError(formattedError?.message, { ...formattedError, error } as any);
      return formattedError;
    },
  });

  await server.start();

  const context = async ({ req, res }: ExpressContextFunctionArgument): Promise<{ ip: string; headers: IncomingHttpHeaders }> => {
    return { headers: req.headers, ip: req.ip };
  };

  app.use(cors<cors.CorsRequest>());
  app.use('/graphql', cors<cors.CorsRequest>(), json(), expressMiddleware(server, { context }));

  registerApiRoutes(app);

  setupGitLoader();

  app.listen({ port: 8000 }, () => console.log(`🚀 Server ready at http://localhost:8000/graphql`));
})();

process.on('uncaughtException', (error) => {
  console.error('Uncaught exception:', error);
  logError(error?.message, { error } as any);

  // Here you can add any cleanup code if needed
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled rejection at:', promise, 'reason:', reason);
  logError(`${'Unhandled rejection at:' + promise + ' reason:' + reason}`, { reason } as any);
});
