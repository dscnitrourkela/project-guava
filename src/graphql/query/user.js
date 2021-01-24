import { GraphQLNonNull, GraphQLID, GraphQLString } from 'graphql';

// Type Defs
import { UserType } from '../types/index.js';

// Models
import { User } from '../../models/index.js';

export const getUserByID = {
  type: UserType,
  args: {
    id: { type: GraphQLNonNull(GraphQLID) },
  },
  resolve(parent, args) {
    return User.findById(args.id);
  },
};

export const getUserByMailID = {
  type: UserType,
  args: {
    mail: { type: GraphQLNonNull(GraphQLString) },
  },
  resolve(parent, args) {
    return Welcome.findOne({ mail: args.mail });
  },
};
