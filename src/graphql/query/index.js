import { GraphQLObjectType } from 'graphql';

// Import Queries
import { getWelcomeMessage, getWelcomeMessages } from './Welcome.js';
import { getUserByID, getUserByMailID } from './user.js';

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    getWelcomeMessage,
    getWelcomeMessages,
    getUserByID,
    getUserByMailID,
  }),
});

export default RootQuery;
