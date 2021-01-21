import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const userSchema = new Schema({
  mail: {
    type: String,
    required: true,
    default: null,
    trim: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  displayPicture: {
    type: String,
    required: false,
    // We can have a default image
  },
  firebaseID: {
    type: String,
    required: true,
  },
  accessLevel: {
    type: String,
    required: true,
  },
  requests: [String],
  signs: [String],
  certificates: [String],
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

userSchema
  .path('mail')
  .validate(
    mail,
    () =>
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/u.test(
        mail
      ),
    'Invalid Email Address'
  );

export default model('user', userSchema);
