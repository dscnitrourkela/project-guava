import { GraphQLString, GraphQLObjectType, GraphQLList, GraphQLEnumType } from 'graphql';
import graphqlIsoDatefrom from 'graphql-iso-date';
const { GraphQLDateTime } = graphqlIsoDatefrom;

import { CertificateInfo, Approver, PixelMap, UserDetails } from './common.js';

export default new GraphQLObjectType({
  name: 'RequestType',
  description: 'Request object created by the certificate initiator for approval',
  fields: () => ({
    initiator: UserDetails,
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    approvers: { type: GraphQLList(Approver) },
    certificateInfo: { type: CertificateInfo },
    pixelMap: { type: PixelMap },
    font: { type: GraphQLString },
    createdBy: UserDetails,
    updatedBy: UserDetails,
    createdAt: { type: GraphQLDateTime },
    updatedAt: { type: GraphQLDateTime },
    status: {
      type: new GraphQLEnumType({
        name: 'status',
        values: {
          'Un-Initiated': { value: 'Un-Initiated' },
          Initiated: { value: 'Initiated' },
          'In-Process': { value: 'In-Process' },
          Approved: { value: 'Approved' },
          Generated: { value: 'Generated' },
        },
      }),
    },
  }),
});
