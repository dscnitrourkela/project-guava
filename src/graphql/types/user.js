const { GraphQLString, GraphQLObjectType, GraphQLID, GraphQLList } = require('graphql');
const SignType = require('./sign');
const SignModel = require('../../models/sign');

const UserType = new GraphQLObjectType({
  name: 'UserType',
  fields: () => ({
    id: { type: GraphQLID },
    mail: { type: GraphQLString },
    name: { type: GraphQLString },
    displayPicture: { type: GraphQLString },
    authProviderID: { type: GraphQLString },
    signs: {
      type: new GraphQLList(SignType),
      resolve(parent) {
        return SignModel.find({ _id: parent.signs });
      },
    },
  }),
});

module.exports = UserType;
