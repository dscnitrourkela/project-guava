const { GraphQLObjectType } = require('graphql');

// Import Queries
const { getUser } = require('./user');
const { getSign } = require('./sign');

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    getUser,
    getSign,
  }),
});

module.exports = RootQuery;
