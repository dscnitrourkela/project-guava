const { GraphQLString, GraphQLInt, GraphQLObjectType } = require('graphql');

const WelcomeType = new GraphQLObjectType({
  name: 'Welcome',
  fields: () => ({
    status: { type: GraphQLInt },
    message: { type: GraphQLString },
  }),
});

module.exports = WelcomeType;
