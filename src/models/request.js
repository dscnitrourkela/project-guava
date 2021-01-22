import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const requestSchema = new Schema(
  {
    initiater: {
      type: Schema.ObjectId,
      required: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
      default: 'Default Title',
      minlength: [10, 'Very short title, minimum 10 characters required'],
      maxlength: [20, 'Too long title, 20 characters maximum length'],
      trim: true,
    },
    description: {
      type: String,
      required: true,
      default: 'Default Description',
      minlength: [20, 'Very short description, minimum 20 characters required'],
      maxlength: [50, 'Too long description, 50 characters maximum length'],
      trim: true,
    },
    status: {
      type: String,
      enum: ['Un-Initiated', 'Initiated', 'Approved'],
      required: true,
      default: 'Un-Initiated',
    },
    approvers: [
      {
        user: { type: Schema.ObjectId, required: true },
        status: {
          type: String,
          enum: ['Rejected', 'Approved'],
          required: true,
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
        approvedAt: {
          type: Date,
          required: false,
        },
      },
    ],
    certificateInfo: {
      template: {
        src: { type: String, required: true },
        blurHash: { type: String, required: true },
      },
      data: {
        type: String,
        required: true,
        trim: true,
      },
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
    font: {
      type: String,
      required: true,
      default: 'Arial',
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

export default model('request', requestSchema);
