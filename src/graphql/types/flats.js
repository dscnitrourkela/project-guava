const { GraphQLString, GraphQLObjectType, GraphQLID } = require('graphql');

const SignFlatType = new GraphQLObjectType({
  name: 'SignFlatType',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    designation: { type: GraphQLString },
    image: { type: GraphQLString },
  }),
});

const UserFlatType = new GraphQLObjectType({
  name: 'UserFlatType',
  fields: () => ({
    id: { type: GraphQLID },
    mail: { type: GraphQLString },
    name: { type: GraphQLString },
    displayPicture: { type: GraphQLString },
    authProviderID: { type: GraphQLString },
  }),
});

module.exports = {
  SignFlatType,
  UserFlatType,
};
