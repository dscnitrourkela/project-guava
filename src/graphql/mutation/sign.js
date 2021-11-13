const { GraphQLString, GraphQLNonNull } = require('graphql');
const mongoose = require('mongoose');

// Type Defs
const { SignType } = require('../types/');

const UserModel = require('../../models/user');
const SignModel = require('../../models/sign');

const { GraphQLError } = require('graphql');

const createSign = {
  name: 'createSign',
  type: SignType,
  args: {
    name: { type: GraphQLNonNull(GraphQLString) },
    image: { type: GraphQLNonNull(GraphQLString) },
    designation: { type: GraphQLNonNull(GraphQLString) },
  },
  async resolve(_, { name, image, designation }, { decodedToken, addCreatedAndUpdatedByWithUser }) {
    if (!decodedToken) {
      return new GraphQLError('Missing fields in the Auth Token');
    }
    const { sub } = decodedToken;
    const userFromDB = await UserModel.findOne({ authProviderID: sub }).exec();
    if (!userFromDB._id) {
      return new GraphQLError('User Not in Database');
    }
    const session = await mongoose.startSession();
    let response;
    await session.withTransaction(async () => {
      const signToSave = new SignModel({
        userID: userFromDB._id,
        name,
        image,
        designation,
        ...addCreatedAndUpdatedByWithUser(),
      });
      const signWithID = await signToSave.save();
      userFromDB.signs.push(signWithID._id);
      await userFromDB.save();
      response = signWithID;
    });
    session.endSession();
    return response;
  },
};

module.exports = { createSign };
