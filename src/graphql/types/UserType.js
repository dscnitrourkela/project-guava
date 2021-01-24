import { GraphQLString, GraphQLObjectType, GraphQLList, GraphQLID } from 'graphql';
import graphqlIsoDatefrom from 'graphql-iso-date';
const { GraphQLDateTime } = graphqlIsoDatefrom;

import { CreatedByDetails } from './common.js';
import RequestType from './RequestType.js';
import Request from '../../models/request.js';

export default new GraphQLObjectType({
  name: 'UserType',
  fields: () => ({
    _id: { type: GraphQLID },
    mail: { type: GraphQLString },
    name: { type: GraphQLString },
    displayPicture: {
      type: new GraphQLObjectType({
        name: 'User Display Picture',
        fields: () => ({
          src: { type: GraphQLString },
          blurHash: { type: GraphQLString },
        }),
      }),
    },
    firebaseID: { type: GraphQLID },
    accessLevel: { type: GraphQLList(GraphQLString) },
    requests: {
      type: GraphQLList(RequestType),
      async resolve(parent) {
        const requestsArray = [];
        await Promise.all(
          parent.requests.map(async (requestId) => {
            const request = await Request.findById(requestId);
            requestsArray.push(request);
            Promise.resolve();
          })
        );
        return requestsArray;
      },
    },
    signs: {
      type: GraphQLList(SignType),
      async resolve(parent) {
        const signsArray = [];
        await Promise.all(
          parent.signs.map(async (signId) => {
            const request = await Request.findById(signId);
            signsArray.push(request);
            Promise.resolve();
          })
        );
        return signsArray;
      },
    },
    createdBy: CreatedByDetails,
    updatedBy: CreatedByDetails,
    createdAt: { type: GraphQLDateTime },
    updatedAt: { type: GraphQLDateTime },
  }),
});
