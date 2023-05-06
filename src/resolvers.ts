import { IResolvers } from '@graphql-tools/utils';
import GraphQLJSON, { GraphQLJSONObject } from 'graphql-type-json';

const resolvers: IResolvers | Array<IResolvers> = {
  JSON: GraphQLJSON,
  JSONObject: GraphQLJSONObject,
};

export default resolvers;
