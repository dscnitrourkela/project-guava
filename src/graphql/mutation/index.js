/* eslint-disable */
const { GraphQLObjectType } = require('graphql');

// Mutations
const { createUser } = require('./user.js');

const mutation = new GraphQLObjectType({
  name: 'mutation',
  fields: () => ({
    createUser,
  }),
});

module.exports = mutation;
