const { GraphQLString, GraphQLNonNull, GraphQLError } = require('graphql');

// Type Defs
const { UserType } = require('../types');

const User = require('../../models/user');

const createUser = {
  name: 'createUser',
  type: UserType,
  args: {
    name: { type: GraphQLNonNull(GraphQLString) },
    displayPicture: { type: GraphQLNonNull(GraphQLString) },
  },
  resolve(_, { name, displayPicture }, { decodedToken, addCreatedAndUpdatedByWithUser }) {
    if (!decodedToken || !decodedToken.email || !decodedToken.sub) {
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
