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
    createdBy: {
      type: Schema.ObjectId,
      required: false, // TODO: change to true later
      trim: true,
    },
    updatedBy: {
      type: Schema.ObjectId,
      required: false, // TODO: change to true later
      trim: true,
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
