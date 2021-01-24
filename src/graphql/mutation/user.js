import { GraphQLString, GraphQLNonNull, GraphQLID, GraphQLList } from 'graphql';

// Type Defs
import { UserType } from '../types/index.js';

// Resolvers
import { addUser, updateUser as updateExistingUser } from '../resolver/index.js';

export const createUser = {
  type: UserType,
  args: {
    mail: { type: GraphQLNonNull(GraphQLString) },
    name: { type: GraphQLNonNull(GraphQLString) },
    displayPicture: { type: GraphQLNonNull(GraphQLString) },
    blurHash: { type: GraphQLNonNull(GraphQLString) },
    firebaseID: { type: GraphQLNonNull(GraphQLID) },
    accessLevel: { type: GraphQLList(GraphQLString) },
  },
  resolve(parent, args) {
    addUser(parent, args);
  },
};

export const updateUser = {
  type: UserType,
  args: {
    name: { type: GraphQLString },
    displayPicture: { type: GraphQLString },
    blurHash: { type: GraphQLString },
  },
  resolve(parent, args) {
    updateExistingUser(parent, args);
  },
};
