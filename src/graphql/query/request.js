const { GraphQLError, GraphQLID } = require('graphql');
// Type Defs
const { RequestType } = require('../types/');

// Models
const RequestModel = require('../../models/request');

const getRequest = {
  name: 'getRequest',
  type: RequestType,
  args: {
    id: { type: GraphQLID },
    initiator: { type: GraphQLID },
  },
  resolve(_, { id, initiator }) {
    if (id) {
      return RequestModel.findById(id).exec();
    }
    if (initiator) {
      return RequestModel.findOne({ initiator }).setOptions({ sanitizeFilter: true }).exec();
    }
    return new GraphQLError('Missing fields');
  },
};

module.exports = { getRequest };
