import { GraphQLString, GraphQLInt, GraphQLObjectType, GraphQLID, GraphQLEnumType } from 'graphql';
import graphqlIsoDatefrom from 'graphql-iso-date';
const { GraphQLDateTime } = graphqlIsoDatefrom;

import { User } from '../../models/index.js';
import UserType from './UserType.js';

export const Approver = new GraphQLObjectType({
  name: 'Request Approvers',
  fields: () => ({
    user: {
      type: GraphQLID,
      async resolve(parent) {
        const user = await User.findById(parent.user);
        if (!user) {
          throw new Error('Initiator not found.');
        }
        return user;
      },
    },
    status: {
      type: new GraphQLEnumType({
        name: 'approval status',
        values: {
          Rejected: { value: 'Rejected' },
          Approved: { value: 'Approved' },
          Pending: { value: 'Pending' },
        },
      }),
    },
    pixel: {
      type: new GraphQLObjectType({
        name: 'Approvers Pixel Map',
        fields: () => ({
          x: { type: GraphQLInt },
          y: { type: GraphQLInt },
        }),
      }),
    },
    scale: { type: GraphQLInt },
    approvedAt: { type: GraphQLDateTime },
  }),
});

export const CertificateInfo = new GraphQLObjectType({
  name: 'Certificate Info',
  fields: () => ({
    template: {
      type: new GraphQLObjectType({
        name: 'Certificate Template',
        fields: () => ({
          src: { type: GraphQLString },
          blurHash: { type: GraphQLString },
        }),
      }),
    },
    data: { type: GraphQLString },
  }),
});

export const PixelMap = new GraphQLObjectType({
  name: 'Request Pixel Map',
  fields: () => ({
    columnName: { type: GraphQLString },
    pixel: {
      type: new GraphQLObjectType({
        name: 'Approvers Pixel Map',
        fields: () => ({
          x: { type: GraphQLInt },
          y: { type: GraphQLInt },
        }),
      }),
    },
    fontSize: { type: GraphQLInt },
    fontWeight: { type: GraphQLInt },
  }),
});

export const CreatedByDetails = {
  type: UserType,
  async resolve(parent) {
    const user = await User.findById(parent.createdById);
    if (!user) {
      throw new Error('Initiator not found.');
    }
    return user;
  },
};
