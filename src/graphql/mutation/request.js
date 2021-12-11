const {
  GraphQLInt,
  GraphQLString,
  GraphQLNonNull,
  GraphQLError,
  GraphQLList,
  GraphQLObjectType,
  GraphQLID,
  GraphQLInputObjectType,
} = require('graphql');

// Type Defs
const { RequestType } = require('../types/');

const Request = require('../../models/request');
const UserModel = require('../../models/user');

const approverInput = new GraphQLInputObjectType({
  name: 'ApproverInput',
  fields: () => ({
    userID: { type: GraphQLNonNull(GraphQLID) },
    xDimension: { type: GraphQLNonNull(GraphQLInt) },
    yDimension: { type: GraphQLNonNull(GraphQLInt) },
    scale: { type: GraphQLNonNull(GraphQLInt) },
  }),
});

const templateInput = new GraphQLInputObjectType({
  name: 'TemplateInput',
  fields: () => ({
    src: { type: GraphQLNonNull(GraphQLString) },
    xDimension: { type: GraphQLNonNull(GraphQLInt) },
    yDimension: { type: GraphQLNonNull(GraphQLInt) },
    data: { type: GraphQLNonNull(GraphQLString) },
  }),
});

const pixelMapInput = new GraphQLInputObjectType({
  name: 'PixelMapInput',
  fields: () => ({
    columnName: { type: GraphQLNonNull(GraphQLString) },
    fontSize: { type: GraphQLNonNull(GraphQLInt) },
    fontWeight: { type: GraphQLNonNull(GraphQLInt) },
    fontColour: { type: GraphQLNonNull(GraphQLString) },
  }),
});

const createRequest = {
  name: 'createRequest',
  type: RequestType,
  args: {
    availabilityDate: { type: GraphQLNonNull(GraphQLString) },
    title: { type: GraphQLNonNull(GraphQLString) },
    description: { type: GraphQLNonNull(GraphQLString) },
    approvers: {
      type: GraphQLList(new GraphQLNonNull(approverInput)),
    },
    template: {
      type: GraphQLNonNull(templateInput),
    },
    pixelMap: {
      type: GraphQLList(new GraphQLNonNull(pixelMapInput)),
    },
    font: { type: GraphQLNonNull(GraphQLString) },
  },
  async resolve(_, args, { decodedToken, addCreatedAndUpdatedByWithUser }) {
    // if (!decodedToken?.sub) {
    //   return new GraphQLError('Missing fields in the Auth Token');
    // }
    const { sub: authProviderID } = decodedToken;

    const userID = await UserModel.findOne({ authProviderID }, '_id').exec();
    // const request = new Request({
    //   userID,
    //   mail,
    //   name,
    //   displayPicture,
    //   authProviderID,
    //   ...addCreatedAndUpdatedByWithUser(),
    // });
    // return request.save();
    return { id: '1' };
  },
};

module.exports = { createRequest };
