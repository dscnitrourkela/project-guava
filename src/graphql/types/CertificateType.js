import { GraphQLString, GraphQLObjectType, GraphQLID, GraphQLList } from 'graphql';
import graphqlIsoDatefrom from 'graphql-iso-date';
const { GraphQLDateTime } = graphqlIsoDatefrom;

import Request from '../../models/request.js';
import { PixelMap, CreatedByDetails } from './common.js';
import RequestType from './RequestType';

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
        name: 'Certificate Template',
        fields: () => ({
          src: { type: GraphQLString },
          blurHash: { type: GraphQLString },
        }),
      }),
    },
    font: { type: GraphQLString },
    mail: { type: GraphQLString },
    pixelMap: { type: PixelMap },
    signMap: {
      type: new GraphQLList({
        id: { type: GraphQLID },
        pixel: {
          type: new GraphQLObjectType({
            name: 'Approvers Pixel Map',
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
