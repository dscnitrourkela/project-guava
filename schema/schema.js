const graphql = require('graphql');

const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    status: {
      type: GraphQLString,
      resolve(parent, args) {
        return 'Welcome to GraphQL';
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
