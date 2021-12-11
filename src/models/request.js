const { Schema, model } = require('mongoose');

const requestSchema = new Schema(
  {
    initiator: {
      type: Schema.ObjectId,
      required: true,
      index: true,
    },
    availabilityDate: {
      type: Date,
      required: true,
    },
    title: {
      type: String,
      required: true,
      default: 'Default Title',
      minlength: [10, 'Very short title, minimum 10 characters required'],
      maxlength: [100, 'Too long title, 100 characters maximum length'],
      trim: true,
    },
    description: {
      type: String,
      required: true,
      default: 'Default Description',
      minlength: [140, 'Very short description, minimum 140 characters required'],
      maxlength: [720, 'Too long description, 720 characters maximum length'],
      trim: true,
    },
    status: {
      type: String,
      index: true,
      enum: ['DRAFT', 'REVIEW', 'APPROVED', 'GENERATED'],
      required: true,
      default: 'DRAFT',
    },
    approvers: [
      {
        user: { type: Schema.ObjectId, required: true },
        status: {
          type: String,
          enum: ['REJECTED', 'APPROVED', 'PENDING'],
          required: true,
          default: 'PENDING',
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
        dimensions: {
          x: { type: Number, required: true },
          y: { type: Number, required: true },
        },
      },
      data: {
        type: String,
        required: true,
        trim: true,
      },
    },
    pixelMap: [
      {
        columnName: { type: String, required: true, trim: true },
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
        fontColour: {
          type: String,
          required: true,
          default: '#000000',
          trim: true,
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

module.exports = model('request', requestSchema);
