const { GraphQLSchema } = require('graphql');

// Queries and Mutations
const query = require('./query/index.js');
const mutation = require('./mutation/index.js');

const schema = new GraphQLSchema({
  query,
  mutation,
});

module.exports = schema;
