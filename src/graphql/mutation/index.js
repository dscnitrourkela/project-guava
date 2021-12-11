/* eslint-disable */
const { GraphQLObjectType } = require('graphql');

// Mutations
const { createUser } = require('./user.js');
const { createSign } = require('./sign.js');
const { createRequest } = require('./request.js');
const mutation = new GraphQLObjectType({
  name: 'mutation',
  fields: () => ({
    createUser,
    createSign,
    createRequest,
  }),
});

module.exports = mutation;
