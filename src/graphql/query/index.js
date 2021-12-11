const { GraphQLObjectType } = require('graphql');

// Import Queries
const { getUser } = require('./user');
const { getSign } = require('./sign');
const { getRequest } = require('./request');

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    getUser,
    getSign,
    getRequest,
  }),
});

module.exports = RootQuery;
