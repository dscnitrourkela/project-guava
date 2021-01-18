import { GraphQLObjectType } from 'graphql';

// Import Queries
import WelcomeQuery from './Welcome.js';

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    welcome: WelcomeQuery,
  }),
});

export default RootQuery;
