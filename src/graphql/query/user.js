const { GraphQLError, GraphQLID, GraphQLString } = require('graphql');
// Type Defs
const UserType = require('../types/user');

// Models
const UserModel = require('../../models/user');

const getUser = {
  type: UserType,
  args: {
    id: { type: GraphQLID },
    mail: { type: GraphQLString },
  },
  resolve(_, { id, mail }) {
    if (id) {
      return UserModel.findById(id);
    }
    if (mail) {
      return UserModel.findOne({ mail });
    }
    return new GraphQLError('Missing fields');
  },
};

module.exports = { getUser };
