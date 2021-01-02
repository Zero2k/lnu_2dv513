import { buildSchema } from 'type-graphql';
import { Container } from 'typedi';
import path from 'path';
import { GraphQLSchema } from 'graphql';
import { authChecker } from '../auth';

export const createSchema = async () => {
  const pathToGraphQL = path.join(__dirname, '../graphql');

  const schema: GraphQLSchema = await buildSchema({
    resolvers: [`${pathToGraphQL}/**/resolver.?s`],
    emitSchemaFile: path.resolve(__dirname, '../schema.gql'),
    validate: false,
    container: Container,
    authChecker,
  });

  return schema;
};
