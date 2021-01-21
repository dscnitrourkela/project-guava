import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const certificateSchema = new Schema({
  request: {
    type: String,
    required: true,
    default: null,
  },
  title: {
    type: String,
    required: true,
    default: 'Default Title',
    minlength: [10, 'Very short title, minimum 10 characters required'],
    maxlength: [20, 'Too long title, 20 characters maximum length'],
  },
  description: {
    type: String,
    required: true,
    default: 'Default Description',
    minlength: [20, 'Very short description, minimum 20 characters required'],
    maxlength: [50, 'Too long description, 50 characters maximum length'],
  },
  template: {
    src: { type: String, required: true },
    blurHash: { type: String, required: true },
  },
  font: {
    type: String,
    required: true,
    default: 'Arial',
  },
  mail: {
    type: String,
    required: true,
    default: null,
  },
  pixelMap: [
    {
      value: { type: String, required: true },
      pixel: {
        x: { type: Number, required: true },
        y: { type: Number, required: true },
      },
      fontSize: {
        type: Number,
        required: true,
        default: 16,
      },
      fontWeight: {
        type: Number,
        required: true,
        default: 500,
      },
    },
  ],
  signMap: [
    {
      id: {
        type: String,
        required: true,
        default: null,
      },
      pixel: {
        x: { type: Number, required: true },
        y: { type: Number, required: true },
      },
      scale: {
        type: Number,
        required: true,
        default: 1,
      },
    },
  ],
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
  },
  updatedBy: {
    type: String,
    required: true,
  },
});

export default model('certificate', certificateSchema);
