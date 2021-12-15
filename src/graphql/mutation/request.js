const {
  GraphQLInt,
  GraphQLString,
  GraphQLNonNull,
  GraphQLError,
  GraphQLList,
  GraphQLID,
  GraphQLInputObjectType,
  GraphQLFloat,
} = require('graphql');
const { GraphQLJSON } = require('graphql-type-json');
// Type Defs
const { RequestType } = require('../types/');

const Request = require('../../models/request');
const UserModel = require('../../models/user');

const { validateRequest } = require('./validateRequest');

const approverInput = new GraphQLInputObjectType({
  name: 'ApproverInput',
  fields: () => ({
    userID: { type: GraphQLNonNull(GraphQLID) },
    xDimension: { type: GraphQLNonNull(GraphQLInt) },
    yDimension: { type: GraphQLNonNull(GraphQLInt) },
    scale: { type: GraphQLNonNull(GraphQLFloat) },
  }),
});

const templateInput = new GraphQLInputObjectType({
  name: 'TemplateInput',
  fields: () => ({
    src: { type: GraphQLNonNull(GraphQLString) },
    xDimension: { type: GraphQLNonNull(GraphQLInt) },
    yDimension: { type: GraphQLNonNull(GraphQLInt) },
    data: { type: GraphQLNonNull(GraphQLJSON) },
  }),
});

const pixelMapInput = new GraphQLInputObjectType({
  name: 'PixelMapInput',
  fields: () => ({
    columnName: { type: GraphQLNonNull(GraphQLString) },
    xDimension: { type: GraphQLNonNull(GraphQLInt) },
    yDimension: { type: GraphQLNonNull(GraphQLInt) },
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
    if (!decodedToken || !decodedToken.sub) {
      return new GraphQLError('Missing fields in the Auth Token');
    }
    const { sub } = decodedToken;
    const userFromDB = await UserModel.findOne({ authProviderID: sub }).setOptions({ sanitizeFilter: true }).exec();
    if (!userFromDB._id) {
      return new GraphQLError('User Not in Database');
    }
    const { hasErrors, errors } = await validateRequest(args);
    if (hasErrors) {
      throw new GraphQLError(errors);
    }

    const initiator = userFromDB._id;
    const status = 'DRAFT';
    const approvers = args.approvers.map((approver) => {
      const { userID, xDimension, yDimension, scale } = approver;
      return {
        user: userID,
        status: 'PENDING',
        pixel: {
          x: xDimension,
          y: yDimension,
        },
        scale,
      };
    });
    const certificateInfo = {
      template: {
        src: args.template.src,
        blurHash: 'TODO: Blurhash',
        dimensions: {
          x: args.template.xDimension,
          y: args.template.yDimension,
        },
      },
      data: args.template.data,
    };

    const pixelMap = args.pixelMap.map((pixel) => {
      const { columnName, xDimension, yDimension, fontSize, fontWeight, fontColour } = pixel;
      return {
        columnName,
        pixel: {
          x: xDimension,
          y: yDimension,
        },
        fontSize,
        fontWeight,
        fontColour,
      };
    });
    const { availabilityDate, title, description, font } = args;

    const request = new Request({
      initiator,
      availabilityDate,
      title,
      description,
      status,
      approvers,
      certificateInfo,
      pixelMap,
      font,
      ...addCreatedAndUpdatedByWithUser(),
    });
    return request.save();
  },
};

const updateRequestApproval = {
  name: 'updateRequestApproval',
  type: RequestType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    status: { type: new GraphQLNonNull(GraphQLString) },
  },
  async resolve(_, { id, status }, { decodedToken, addUpdatedByWithUser }) {
    if (status !== 'APPROVED' && status !== 'REJECTED') {
      return new GraphQLError('Invalid status');
    }

    if (!decodedToken || !decodedToken.sub) {
      return new GraphQLError('Missing fields in the Auth Token');
    }
    const { sub } = decodedToken;
    const userFromDB = await UserModel.findOne({ authProviderID: sub }).setOptions({ sanitizeFilter: true }).exec();
    if (!userFromDB._id) {
      return new GraphQLError('Approval User Not in Database');
    }
    const request = await Request.findById(id).exec();
    if (!request) {
      return new GraphQLError('Request Not Found');
    }
    if (request.status !== 'REVIEW') {
      return new GraphQLError('Request is not in review status');
    }
    const orderOfApprover = request.approvers.findIndex(
      (approver) => approver.user.toString() === userFromDB._id.toString() && approver.status === 'PENDING'
    );
    if (orderOfApprover === -1) {
      return new GraphQLError('User Not in Pending Approvers');
    }
    const isLastApprover = request.approvers.length - 1 === orderOfApprover;
    const isNextApprover = request.approvers
      .slice(0, orderOfApprover)
      .every((approver) => approver.status === 'APPROVED');

    if (!isNextApprover) {
      return new GraphQLError('User Not Next Approver');
    }

    request.approvers[orderOfApprover].status = status;
    request.approvers[orderOfApprover].updatedAt = new Date();
    if (isLastApprover) {
      request.status = 'APPROVED';
    }
    request.updatedBy = addUpdatedByWithUser().updatedBy;
    return request.save();
  },
};

const sendRequestToReview = {
  name: 'sendRequestToReview',
  type: RequestType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
  async resolve(_, { id }, { decodedToken, addUpdatedByWithUser }) {
    if (!decodedToken || !decodedToken.sub) {
      return new GraphQLError('Missing fields in the Auth Token');
    }
    const { sub } = decodedToken;
    const userFromDB = await UserModel.findOne({ authProviderID: sub }).setOptions({ sanitizeFilter: true }).exec();
    if (!userFromDB._id) {
      return new GraphQLError('User Not in Database');
    }
    const request = await Request.findById(id).exec();
    if (!request) {
      return new GraphQLError('Request Not Found');
    }
    if (request.status !== 'DRAFT') {
      return new GraphQLError('Request is not in draft status');
    }
    const isInitiator = request.initiator.toString() === userFromDB._id.toString();
    if (!isInitiator) {
      return new GraphQLError('User Not Initiator');
    }
    request.status = 'REVIEW';
    request.updatedBy = addUpdatedByWithUser().updatedBy;
    return request.save();
  },
};

module.exports = { createRequest, updateRequestApproval, sendRequestToReview };
