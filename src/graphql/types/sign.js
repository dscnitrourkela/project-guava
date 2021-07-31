const { GraphQLString, GraphQLObjectType, GraphQLID } = require('graphql');

const UserType = require('./user');

const UserModel = require('../../models/user');

const SignType = new GraphQLObjectType({
  name: 'SignType',
  fields: () => ({
    id: { type: GraphQLID },
    user: {
      type: UserType,
      async resolve(parent) {
        const user = await UserModel.findById(parent.userID);
        if (!user) {
          throw new Error('User not found.');
        }
        return user;
      },
    },
    name: { type: GraphQLString },
    designation: { type: GraphQLString },
    image: { type: GraphQLString },
  }),
});

module.exports = SignType;
