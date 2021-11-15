const { GraphQLID, GraphQLNonNull } = require('graphql');
// Type Defs
const { SignType } = require('../types/');

// Models
const SignModel = require('../../models/sign');
const getSign = {
  name: 'getSign',
  type: SignType,
  args: {
    id: { type: GraphQLNonNull(GraphQLID) },
  },
  resolve(_, { id }) {
    return SignModel.findById(id).exec();
  },
};

module.exports = { getSign };
