import { GraphQLString, GraphQLObjectType, GraphQLID } from 'graphql';
import graphqlIsoDatefrom from 'graphql-iso-date';

// Types
import { CreatedByDetails } from './common.js';
import UserType from './UserType.js';

const { GraphQLDateTime } = graphqlIsoDatefrom;

export default new GraphQLObjectType({
  name: 'SignType',
  fields: () => ({
    _id: { type: GraphQLID },
    user: {
      type: UserType,
      async resolve(parent) {
        const user = await User.findById(parent.userID);
        if (!user) {
          throw new Error('Initiator not found.');
        }
        return user;
      },
    },
    name: { type: GraphQLString },
    image: { type: GraphQLString },
    designation: { type: GraphQLString },
    createdBy: CreatedByDetails,
    updatedBy: CreatedByDetails,
    createdAt: { type: GraphQLDateTime },
    updatedAt: { type: GraphQLDateTime },
  }),
});
