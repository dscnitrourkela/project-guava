const { GraphQLString, GraphQLObjectType, GraphQLID } = require('graphql');
const { UserFlatType } = require('./flats');

const UserModel = require('../../models/user');

const SignType = new GraphQLObjectType({
  name: 'SignType',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    designation: { type: GraphQLString },
    image: { type: GraphQLString },
    user: {
      type: UserFlatType,
      resolve: (parent) => UserModel.findById(parent.userID).exec(),
    },
  }),
});

module.exports = { SignType };
