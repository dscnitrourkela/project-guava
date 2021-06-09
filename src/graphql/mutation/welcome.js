const { GraphQLInt, GraphQLNonNull, GraphQLString } = require('graphql');

const { WelcomeType } = require('../types/Welcome');

// Models
const Welcome = require('../../models/welcome.js');

const addNewWelcomeMessage = {
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

const deleteWelcomeMessage = {
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

module.exports = { deleteWelcomeMessage, addNewWelcomeMessage };
