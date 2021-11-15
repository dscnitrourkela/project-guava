const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    mail: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      index: true,
      lowercase: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    displayPicture: {
      type: String,
      required: false,
    },
    authProviderID: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    signs: [
      {
        type: Schema.ObjectId,
      },
    ],
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

userSchema
  .path('mail')
  .validate(
    (mail) =>
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/u.test(
        mail
      ),
    'Invalid Email Address'
  );

module.exports = model('user', userSchema);
