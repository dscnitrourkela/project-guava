import { GraphQLObjectType } from 'graphql';

// Import Queries
import { getWelcomeMessage, getWelcomeMessages } from './Welcome.js';

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    getWelcomeMessage,
    getWelcomeMessages,
  }),
});

export default RootQuery;
