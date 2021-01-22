import { GraphQLInt, GraphQLString, GraphQLNonNull } from 'graphql';

// Type Defs
import { WelcomeType } from '../types/index.js';

// Models
import { Welcome } from '../../models/index.js';

export const addNewWelcomeMessage = {
  type: WelcomeType,
  args: {
    message: { type: new GraphQLNonNull(GraphQLString) },
    status: { type: new GraphQLNonNull(GraphQLInt) },
  },
  async resolve(parent, { message, status }) {
    const checkWelcome = await Welcome.findOne({ status });

    if (checkWelcome) {
      throw new Error(`Message with status ${status} already exists.`);
    }

    const welcome = new Welcome({
      message,
      status,
    });

    try {
      return await welcome.save();
    } catch (error) {
      throw new Error('Could not save the welcome message.', error);
    }
  },
};

export const deleteWelcomeMessage = {
  type: WelcomeType,
  args: {
    status: { type: new GraphQLNonNull(GraphQLInt) },
  },
  async resolve(parent, { status }) {
    const checkWelcome = await Welcome.findOne({ status });

    if (!checkWelcome) {
      throw new Error(`No Message with status ${status} found`);
    }

    try {
      return await Welcome.findOneAndDelete({ status });
    } catch (error) {
      throw new Error('Could not delete the welcome message.', error);
    }
  },
};
