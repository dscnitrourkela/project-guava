const { GraphQLInt, GraphQLNonNull, GraphQLList } = require('graphql');

// Type Defs
const WelcomeType = require('../types/Welcome.js');

// Models
const Welcome = require('../../models/welcome.js');

const getWelcomeMessages = {
  type: new GraphQLList(WelcomeType),
  args: {},
  resolve() {
    return Welcome.find({});
  },
};

const getWelcomeMessage = {
  type: WelcomeType,
  args: { status: { type: new GraphQLNonNull(GraphQLInt) } },
  resolve(parent, args) {
    return Welcome.findOne({ status: args.status });
  },
};

module.exports = { getWelcomeMessage, getWelcomeMessages };
