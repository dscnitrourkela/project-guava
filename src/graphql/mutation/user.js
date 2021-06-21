const { GraphQLString, GraphQLNonNull, GraphQLID } = require('graphql');

// Type Defs
const UserType = require('../types/user');

const User = require('../../models/user');

const createUser = {
  type: UserType,
  args: {
    mail: { type: GraphQLNonNull(GraphQLString) },
    name: { type: GraphQLNonNull(GraphQLString) },
    displayPicture: { type: GraphQLNonNull(GraphQLString) },
    authProviderID: { type: GraphQLNonNull(GraphQLID) },
  },
  resolve(_, { mail, name, displayPicture, authProviderID }) {
    const user = new User({
      mail,
      name,
      displayPicture,
      authProviderID,
    });
    return user.save();
  },
};

module.exports = { createUser };
