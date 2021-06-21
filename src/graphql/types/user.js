const { GraphQLString, GraphQLObjectType, GraphQLID } = require('graphql');

const UserType = GraphQLObjectType({
  name: 'UserType',
  fields: () => ({
    id: { type: GraphQLID },
    mail: { type: GraphQLString },
    name: { type: GraphQLString },
    displayPicture: { type: GraphQLString },
    authProviderID: { type: GraphQLString },
  }),
});

module.exports = UserType;
