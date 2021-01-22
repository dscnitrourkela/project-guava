/* eslint-disable */
import { GraphQLObjectType } from 'graphql';

// Mutations
import { addNewWelcomeMessage, deleteWelcomeMessage } from './welcome.js';

const Mutation = new GraphQLObjectType({
  name: 'mutation',
  fields: () => ({
    addNewWelcomeMessage,
    deleteWelcomeMessage,
  }),
});

export default Mutation;
