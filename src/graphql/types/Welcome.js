import { GraphQLString, GraphQLInt, GraphQLObjectType } from 'graphql';

export default new GraphQLObjectType({
  name: 'Welcome',
  fields: () => ({
    status: { type: GraphQLInt },
    message: { type: GraphQLString },
  }),
});
