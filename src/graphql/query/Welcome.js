const { GraphQLInt, GraphQLNonNull, GraphQLList } = require('graphql');

// Type Defs
const WelcomeType = require('../types/welcome.js');

// Models
const WelcomeModel = require('../../models/welcome.js');

const getWelcomeMessages = {
  type: new GraphQLList(WelcomeType),
  args: {},
  resolve() {
    return WelcomeModel.find({});
  },
};

const getWelcomeMessage = {
  type: WelcomeType,
  args: { status: { type: new GraphQLNonNull(GraphQLInt) } },
  resolve(parent, args) {
    return WelcomeModel.findOne({ status: args.status });
  },
};

module.exports = { getWelcomeMessage, getWelcomeMessages };
