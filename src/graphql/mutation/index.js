/* eslint-disable */
const { GraphQLObjectType } = require('graphql');

// Mutations
const { createUser } = require('./user.js');
const { createSign } = require('./sign.js');
const { createRequest, updateRequestApproval, sendRequestToReview } = require('./request.js');
const mutation = new GraphQLObjectType({
  name: 'mutation',
  fields: () => ({
    createUser,
    createSign,
    createRequest,
    updateRequestApproval,
    sendRequestToReview,
  }),
});

module.exports = mutation;
