const { GraphQLSchema } = require('graphql');

// Queries and Mutations
const query = require('./query/index.js');
// const Mutation = require('./mutation/index.js');

const schema = new GraphQLSchema({
  query,
  // mutation: Mutation,
});

module.exports = schema;
