import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const certificateSchema = new Schema(
  {
    request: {
      type: Schema.ObjectId,
      required: true,
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
    template: {
      src: { type: String, required: true },
      blurHash: { type: String, required: true },
      dimensions: {
        x: { type: Number, required: true },
        y: { type: Number, required: true },
      },
    },
    font: {
      type: String,
      required: true,
      default: 'Arial',
    },
    mail: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
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
          type: Schema.ObjectId,
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
      },
    ],
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

certificateSchema
  .path('mail')
  .validate(
    (mail) =>
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/u.test(
        mail
      ),
    'Invalid Email Address'
  );

export default model('certificate', certificateSchema);
