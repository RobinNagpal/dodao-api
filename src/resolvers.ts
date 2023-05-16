import byteResolvers from '@/graphql/resolvers/byteResolvers';
import guideResolvers from '@/graphql/resolvers/guideResolvers';
import { IResolvers } from '@graphql-tools/utils';
import GraphQLJSON, { GraphQLJSONObject } from 'graphql-type-json';

const resolvers: IResolvers | Array<IResolvers> = {
  JSON: GraphQLJSON,
  JSONObject: GraphQLJSONObject,
  ...byteResolvers,
  ...guideResolvers,
};

export default resolvers;
