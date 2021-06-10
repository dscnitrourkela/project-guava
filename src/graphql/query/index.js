const { GraphQLObjectType } = require('graphql');

// Import Queries
const { getWelcomeMessage, getWelcomeMessages } = require('./welcome.js');

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    getWelcomeMessage,
    getWelcomeMessages,
  }),
});

module.exports = RootQuery;
