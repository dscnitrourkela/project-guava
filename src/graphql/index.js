import { GraphQLSchema } from 'graphql';

// Queries and Mutations
import Query from './query/index.js';
// import Mutation from './mutation';

const schema = new GraphQLSchema({
  query: Query,
  // mutation: Mutation,
});

export default schema;
