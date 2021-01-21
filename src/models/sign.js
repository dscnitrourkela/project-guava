import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const signSchema = new Schema({
  userID: {
    type: String,
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
  },
  designation: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Number,
    required: true,
    default: Date.now(),
  },
  updatedAt: {
    type: Number,
    required: true,
    default: Date.now(),
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
    required: false,
    default: 1.0,
  },
});

export default model('sign', signSchema);
