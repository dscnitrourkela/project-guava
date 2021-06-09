/* eslint-disable */
import { GraphQLObjectType } from 'graphql';

// Mutations
const { addNewWelcomeMessage, deleteWelcomeMessage } = require('./welcome.js');

const Mutation = new GraphQLObjectType({
  name: 'mutation',
  fields: () => ({
    addNewWelcomeMessage,
    deleteWelcomeMessage,
  }),
});

module.exports = Mutation;
