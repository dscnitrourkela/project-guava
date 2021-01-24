import { GraphQLString, GraphQLObjectType, GraphQLID, GraphQLList } from 'graphql';
import graphqlIsoDatefrom from 'graphql-iso-date';

// Models
import Request from '../../models/request.js';

// Types
import { PixelMap, CreatedByDetails } from './common.js';
import RequestType from './RequestType';

const { GraphQLDateTime } = graphqlIsoDatefrom;

export default new GraphQLObjectType({
  name: 'SignType',
  fields: () => ({
    _id: { type: GraphQLID },
    request: {
      type: RequestType,
      async resolve(parent) {
        const request = await Request.findById(parent.request);
        if (!request) {
          throw new Error('Request not found');
        }
        return request;
      },
    },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    template: {
      type: new GraphQLObjectType({
        name: 'CertificateTemplate',
        fields: () => ({
          src: { type: GraphQLString },
          blurHash: { type: GraphQLString },
        }),
      }),
    },
    font: { type: GraphQLString },
    mail: { type: GraphQLString },
    pixelMap: { type: PixelMap('CertificatePixelMap') },
    signMap: {
      type: new GraphQLList({
        id: { type: GraphQLID },
        pixel: {
          type: new GraphQLObjectType({
            name: 'ApproversPixelMap',
            fields: () => ({
              x: { type: GraphQLInt },
              y: { type: GraphQLInt },
            }),
          }),
        },
      }),
    },
    createdBy: CreatedByDetails,
    updatedBy: CreatedByDetails,
    createdAt: { type: GraphQLDateTime },
    updatedAt: { type: GraphQLDateTime },
  }),
});
