const { GraphQLString, GraphQLObjectType, GraphQLID, GraphQLList, GraphQLInt } = require('graphql');
const { UserFlatType, UserFlatTypeWithSign } = require('./flats');
const { GraphQLJSON } = require('graphql-type-json');
const UserModel = require('../../models/user');
const { GraphQLFloat } = require('graphql');
const { GraphQLDateTime } = require('graphql-iso-date');
const RequestType = new GraphQLObjectType({
  name: 'RequestType',
  fields: () => ({
    id: { type: GraphQLID },
    initiator: { type: UserFlatType, resolve: (parent) => UserModel.findById(parent.initiator).exec() },
    availabilityDate: { type: GraphQLDateTime },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
    approvers: {
      type: new GraphQLList(
        new GraphQLObjectType({
          name: 'Approver',
          fields: () => ({
            user: { type: UserFlatTypeWithSign, resolve: (parent) => UserModel.findById(parent.user).exec() },
            status: { type: GraphQLString },
            xDimension: { type: GraphQLInt, resolve: (parent) => parent.pixel.x },
            yDimension: { type: GraphQLInt, resolve: (parent) => parent.pixel.y },
            scale: { type: GraphQLFloat },
            updatedAt: { type: GraphQLDateTime },
          }),
        })
      ),
    },
    certificateInfo: {
      type: new GraphQLObjectType({
        name: 'CertificateInfo',
        fields: () => ({
          template: {
            type: new GraphQLObjectType({
              name: 'Template',
              fields: () => ({
                src: { type: GraphQLString },
                blurHash: { type: GraphQLString },
                xDimension: { type: GraphQLInt, resolve: (parent) => parent.dimensions.x },
                yDimension: { type: GraphQLInt, resolve: (parent) => parent.dimensions.y },
              }),
            }),
          },
          data: { type: GraphQLJSON },
        }),
      }),
    },
    pixelMap: {
      type: new GraphQLList(
        new GraphQLObjectType({
          name: 'PixelMap',
          fields: () => ({
            columnName: { type: GraphQLString },
            xDimension: { type: GraphQLInt, resolve: (parent) => parent.pixel.x },
            yDimension: { type: GraphQLInt, resolve: (parent) => parent.pixel.y },
            fontSize: { type: GraphQLInt },
            fontWeight: { type: GraphQLInt },
            fontColor: { type: GraphQLString },
          }),
        })
      ),
    },
    font: { type: GraphQLString },
  }),
});

module.exports = { RequestType };
