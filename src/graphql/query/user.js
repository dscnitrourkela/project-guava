import { GraphQLError, GraphQLID, GraphQLString } from 'graphql';

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
  resolve(_, args) {
    if (!args.id && !args.mail) {
      return new GraphQLError('Missing fields');
    }
    if (args.id) {
      return UserModel.findById(args.id);
    }
    return UserModel.findOne({ mail: args.mail });
  },
};

module.exports = { getUser };
