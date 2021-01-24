import { GraphQLString, GraphQLObjectType, GraphQLList, GraphQLEnumType } from 'graphql';
import graphqlIsoDatefrom from 'graphql-iso-date';

// Types
import { CertificateInfo, Approver, PixelMap, CreatedByDetails } from './common.js';
import UserType from './UserType.js';

const { GraphQLDateTime } = graphqlIsoDatefrom;

export default new GraphQLObjectType({
  name: 'RequestType',
  description: 'Request object created by the certificate initiator for approval',
  fields: () => ({
    initiator: {
      type: UserType,
      async resolve(parent) {
        const user = await User.findById(parent.initiator);
        if (!user) {
          throw new Error('Initiator not found.');
        }
        return user;
      },
    },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    approvers: { type: GraphQLList(Approver('RequestApprover')) },
    certificateInfo: { type: CertificateInfo('RequesetCertificateInfo') },
    pixelMap: { type: PixelMap('RequestPixelMap') },
    font: { type: GraphQLString },
    createdBy: CreatedByDetails,
    updatedBy: CreatedByDetails,
    createdAt: { type: GraphQLDateTime },
    updatedAt: { type: GraphQLDateTime },
    status: {
      type: new GraphQLEnumType({
        name: 'status',
        values: {
          UnInitiated: { value: 'Un-Initiated' },
          Initiated: { value: 'Initiated' },
          InProcess: { value: 'In-Process' },
          Approved: { value: 'Approved' },
          Generated: { value: 'Generated' },
        },
      }),
    },
  }),
});
