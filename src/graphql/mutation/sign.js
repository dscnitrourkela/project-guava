const { GraphQLString, GraphQLNonNull, GraphQLID } = require('graphql');

// Type Defs
const SignType = require('../types/sign');

const UserModel = require('../../models/user');
const SignModel = require('../../models/sign');

const { addCreatedAndUpdatedBy, addUpdatedBy } = require('../../utils/index');
const { GraphQLError } = require('graphql');

const createSign = {
  type: SignType,
  args: {
    userID: { type: GraphQLID },
    userMail: { type: GraphQLString },
    name: { type: GraphQLNonNull(GraphQLString) },
    image: { type: GraphQLNonNull(GraphQLString) },
    designation: { type: GraphQLNonNull(GraphQLString) },
  },
  async resolve(_, { userID, userMail, name, image, designation }) {
    if (userID) {
      const ifUserExists = await UserModel.exists({ _id: userID });
      if (ifUserExists) {
        const sign = new SignModel({ userID, userMail, name, image, designation, ...addCreatedAndUpdatedBy(null) });
        return sign.save();
      }
      return new GraphQLError('User Not in Database');
    }
    if (userMail) {
      const userID = await UserModel.findOne({ mail: userMail }, '_id').exec();
      if (userID) {
        const sign = new SignModel({ userID, userMail, name, image, designation, ...addCreatedAndUpdatedBy(null) });
        return sign.save();
      }
      return new GraphQLError('User Not in Database');
    }
    return new GraphQLError('Missing fields');
  },
};

module.exports = { createSign };
