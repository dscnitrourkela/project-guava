const { GraphQLError, GraphQLID, GraphQLList } = require('graphql');
// Type Defs
const SignType = require('../types/sign');

// Models
const SignModel = require('../../models/sign');
const UserModel = require('../../models/user');
const getSign = {
  type: GraphQLList(SignType),
  args: {
    signId: { type: GraphQLID },
    userId: { type: GraphQLID },
  },
  async resolve(_, { signId, userId }) {
    if (signId) {
      return [SignModel.findById(signId).exec()];
    }
    if (userId) {
      return (
        (await UserModel.findById(userId).select('signs').populate({ path: 'signs', model: 'sign' }).exec())?.signs ||
        []
      );
    }
    return new GraphQLError('signId or userId is required');
  },
};

module.exports = { getSign };
