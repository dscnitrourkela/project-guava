const { GraphQLError, GraphQLID, GraphQLString } = require('graphql');
// Type Defs
const { UserType } = require('../types/');

// Models
const UserModel = require('../../models/user');

const getUser = {
  name: 'getUser',
  type: UserType,
  args: {
    id: { type: GraphQLID },
    mail: { type: GraphQLString },
  },
  resolve(_, { id, mail }) {
    if (id) {
      return UserModel.findById(id).exec();
    }
    if (mail) {
      return UserModel.findOne({ mail }).exec();
    }
    return new GraphQLError('Missing fields');
  },
};

module.exports = { getUser };
