import { GraphQLInt, GraphQLNonNull, GraphQLList } from 'graphql';

// Type Defs
import { WelcomeType } from '../types/index.js';

// Models
import { Welcome } from '../../models/index.js';

export const getWelcomeMessages = {
  type: new GraphQLList(WelcomeType),
  args: {},
  resolve() {
    return Welcome.find({});
  },
};

export const getWelcomeMessage = {
  type: WelcomeType,
  args: { status: { type: new GraphQLNonNull(GraphQLInt) } },
  resolve(parent, args) {
    return Welcome.findOne({ status: args.status });
  },
};
