import { GraphQLString, GraphQLObjectType, GraphQLList, GraphQLID } from 'graphql';
import { GraphQLDateTime } from 'graphql-iso-date';

import { UserDetails } from './common.js';
import RequestType from './RequestType.js';

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
    requests: { type: GraphQLList(RequestType) },
    // signs: {type: GraphQLList(SignType)},
    createdBy: UserDetails,
    updatedBy: UserDetails,
    createdAt: GraphQLDateTime,
    updatedAt: GraphQLDateTime,
  }),
});
