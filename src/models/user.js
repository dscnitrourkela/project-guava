import mongoose from 'mongoose';
const { Schema, model } = mongoose;

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
      src: {
        type: String,
        required: false,
        // We can have a default image
      },
      blurHash: {
        type: String,
        required: false,
        // We can have a default image
      },
    },
    firebaseID: {
      type: String,
      required: false, // TODO: Change to true later
    },
    accessLevel: [
      {
        type: String,
        required: false, // TODO: Change to true later
      },
    ],
    requests: [Schema.ObjectId],
    signs: [Schema.ObjectId],
    createdBy: {
      type: Schema.ObjectId,
      required: false, // TODO: Change to true later
      trim: true,
    },
    updatedBy: {
      type: Schema.ObjectId,
      required: false, // TODO: Change to true later
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

userSchema
  .path('mail')
  .validate(
    mail,
    () =>
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/u.test(
        mail
      ),
    'Invalid Email Address'
  )
  .index({ unique: true });

export default model('user', userSchema);
