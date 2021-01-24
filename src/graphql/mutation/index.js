/* eslint-disable */
import { GraphQLObjectType } from 'graphql';

// Mutations
import { addNewWelcomeMessage, deleteWelcomeMessage } from './welcome.js';
import { createUser, updateUser } from './user.js';

const Mutation = new GraphQLObjectType({
  name: 'mutation',
  fields: () => ({
    addNewWelcomeMessage,
    deleteWelcomeMessage,
    createUser,
    updateUser,
  }),
});

export default Mutation;
