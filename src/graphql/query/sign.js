const { GraphQLError, GraphQLID, GraphQLList } = require('graphql');
// Type Defs
const SignType = require('../types/sign');

// Models
const SignModel = require('../../models/sign');

const getSign = {
  type: GraphQLList(SignType),
  args: {
    signId: { type: GraphQLID },
    userId: { type: GraphQLID },
  },
  resolve(_, { signId, userId }) {
    if (signId) {
      return [SignModel.findById(signId)];
    }
    if (userId) {
      return SignModel.find({ userID: userId });
    }
    return new GraphQLError('signId or userId is required');
  },
};

module.exports = { getSign };
