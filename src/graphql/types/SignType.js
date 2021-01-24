import { GraphQLString, GraphQLObjectType, GraphQLID } from 'graphql';
import graphqlIsoDatefrom from 'graphql-iso-date';
const { GraphQLDateTime } = graphqlIsoDatefrom;

import { UserDetails } from './common.js';

export default new GraphQLObjectType({
  name: 'SignType',
  fields: () => ({
    _id: { type: GraphQLID },
    user: UserDetails,
    name: { type: GraphQLString },
    image: { type: GraphQLString },
    designation: { type: GraphQLString },
    createdBy: UserDetails,
    updatedBy: UserDetails,
    createdAt: GraphQLDateTime,
    updatedAt: GraphQLDateTime,
  }),
});
