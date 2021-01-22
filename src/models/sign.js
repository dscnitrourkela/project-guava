import mongoose from 'mongoose';
const { Schema, model } = mongoose;

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
      src: {
        type: String,
        required: true,
      },
      blurHash: {
        type: String,
        required: true,
      },
    },
    designation: {
      type: String,
      required: true,
      trim: true,
    },
    createdBy: {
      type: String,
      required: true,
      trim: true,
    },
    updatedBy: {
      type: String,
      required: true,
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

export default model('sign', signSchema);
