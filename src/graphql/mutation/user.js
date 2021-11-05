const { GraphQLString, GraphQLNonNull, GraphQLError } = require('graphql');

// Type Defs
const UserType = require('../types/user');

const User = require('../../models/user');

const createUser = {
  type: UserType,
  args: {
    name: { type: GraphQLNonNull(GraphQLString) },
    displayPicture: { type: GraphQLNonNull(GraphQLString) },
  },
  resolve(_, { name, displayPicture }, { decodedToken, addCreatedAndUpdatedByWithUser }) {
    if (!decodedToken) {
      return new GraphQLError('Missing fields in the Auth Token');
    }
    const { email: mail, sub: authProviderID } = decodedToken;
    const user = new User({
      mail,
      name,
      displayPicture,
      authProviderID,
      ...addCreatedAndUpdatedByWithUser(),
    });
    return user.save();
  },
};

module.exports = { createUser };
