const { GraphQLString, GraphQLObjectType, GraphQLID, GraphQLList } = require('graphql');
const { SignFlatType } = require('./flats');
const SignModel = require('../../models/sign');

const UserType = new GraphQLObjectType({
  name: 'UserType',
  fields: () => ({
    id: { type: GraphQLID },
    mail: { type: GraphQLString },
    name: { type: GraphQLString },
    displayPicture: { type: GraphQLString },
    authProviderID: { type: GraphQLString },
    signs: {
      type: new GraphQLList(SignFlatType),
      resolve: (parent) => SignModel.find({ _id: parent.signs }).exec(),
    },
  }),
});

module.exports = { UserType };
