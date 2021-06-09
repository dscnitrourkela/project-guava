const { GraphQLSchema } = require('graphql');

// Queries and Mutations
const Query = require('./query/index.js');
// const Mutation = require('./mutation/index.js');

const schema = new GraphQLSchema({
  query: Query,
  // mutation: Mutation,
});

module.exports = schema;
