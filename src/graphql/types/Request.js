import { GraphQLString, GraphQLObjectType, GraphQLList, GraphQLEnumType, GraphQLID } from 'graphql';
import { GraphQLDateTime } from 'graphql-iso-date';

import { CertificateInfo, Approvers, PixelMap, UserDetails } from './common.js';

export default new GraphQLObjectType({
  name: 'Welcome',
  description: 'Request object created by the certificate initiator for approval',
  fields: () => ({
    initiatorID: { type: GraphQLID },
    initiator: UserDetails,
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    approvers: { type: GraphQLList(Approvers) },
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
