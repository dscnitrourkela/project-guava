/* eslint-disable */
const { GraphQLObjectType } = require('graphql');

// Mutations
const { createUser } = require('./user.js');
const { createSign } = require('./sign.js');
const mutation = new GraphQLObjectType({
  name: 'mutation',
  fields: () => ({
    createUser,
    createSign,
  }),
});

module.exports = mutation;
