const { GraphQLString, GraphQLObjectType, GraphQLID } = require('graphql');

const SignType = new GraphQLObjectType({
  name: 'SignType',
  fields: () => ({
    id: { type: GraphQLID },
    userID: { type: GraphQLID },
    name: { type: GraphQLString },
    designation: { type: GraphQLString },
    image: { type: GraphQLString },
  }),
});

module.exports = SignType;
