const { GraphQLString, GraphQLObjectType, GraphQLID, GraphQLList } = require('graphql');
const SignModel = require('../../models/sign');

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

const UserFlatTypeWithSign = new GraphQLObjectType({
  name: 'UserFlatTypeWithSign',
  fields: () => ({
    id: { type: GraphQLID },
    mail: { type: GraphQLString },
    name: { type: GraphQLString },
    displayPicture: { type: GraphQLString },
    authProviderID: { type: GraphQLString },
    signs: {
      type: GraphQLList(SignFlatType),
      resolve: (parent) => SignModel.find({ _id: parent.signs }).setOptions({ sanitizeFilter: true }).exec(),
    },
  }),
});

module.exports = {
  SignFlatType,
  UserFlatType,
  UserFlatTypeWithSign,
};
