const { Schema, model } = require('mongoose');

const signSchema = new Schema(
  {
    userID: {
      type: Schema.ObjectId,
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      required: true,
      trim: true,
    },
    designation: {
      type: String,
      required: true,
      trim: true,
    },
    isActive: {
      type: Boolean,
      required: true,
      default: true,
    },
    colour: {
      type: String,
      required: true,
      default: '#000000',
      trim: true,
    },
    createdBy: {
      type: String,
      required: true,
      default: 'system',
    },
    updatedBy: {
      type: String,
      required: true,
      default: 'system',
    },
    schemaVersion: {
      type: Number,
      required: true,
      default: 1,
    },
  },
  { timestamps: true }
);

module.exports = model('sign', signSchema);
