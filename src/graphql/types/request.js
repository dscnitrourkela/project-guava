const { GraphQLString, GraphQLObjectType, GraphQLID, GraphQLList, GraphQLInt } = require('graphql');
const { UserFlatType, UserFlatTypeWithSign } = require('./flats');

const RequestType = new GraphQLObjectType({
  name: 'RequestType',
  fields: () => ({
    id: { type: GraphQLID },
    initiator: { type: UserFlatType },
    availabilityDate: { type: GraphQLString },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
    approvers: {
      type: new GraphQLList(
        new GraphQLObjectType({
          name: 'Approver',
          fields: () => ({
            user: { type: UserFlatTypeWithSign },
            status: { type: GraphQLString },
            xDimension: { type: GraphQLInt },
            yDimension: { type: GraphQLInt },
            scale: { type: GraphQLInt },
            approvedAt: { type: GraphQLString },
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
                xDimension: { type: GraphQLInt },
                yDimension: { type: GraphQLInt },
              }),
            }),
          },
          data: { type: GraphQLString },
        }),
      }),
    },
    pixelMap: {
      type: new GraphQLList(
        new GraphQLObjectType({
          name: 'PixelMap',
          fields: () => ({
            columnName: { type: GraphQLString },
            xDimension: { type: GraphQLInt },
            yDimension: { type: GraphQLInt },
            fontSize: { type: GraphQLInt },
            fontWeight: { type: GraphQLInt },
            fontColor: { type: GraphQLString },
          }),
        })
      ),
    },
    pixelMap: { type: GraphQLString },
    font: { type: GraphQLString },
  }),
});

module.exports = { RequestType };
