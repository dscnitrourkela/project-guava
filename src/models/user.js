const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    mail: {
      type: String,
      required: true,
      trim: true,
      unique: true,
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
      required: true, // TODO: Change to true later
    },
    signs: [
      {
        type: Schema.ObjectId,
      },
    ],
    createdBy: {
      type: Schema.ObjectId,
      required: false, // TODO: Change to true later
    },
    updatedBy: {
      type: Schema.ObjectId,
      required: false, // TODO: Change to true later
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
  )
  .index({ unique: true });

module.exports = model('user', userSchema);
