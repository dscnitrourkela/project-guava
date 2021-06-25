const { GraphQLObjectType } = require('graphql');

// Import Queries
const { getUser } = require('./user');

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    getUser,
  }),
});

module.exports = RootQuery;
