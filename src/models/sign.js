const { Schema, model } = require('mongoose');

const UserModel = require('./user');

const signSchema = new Schema(
  {
    userID: {
      type: Schema.ObjectId,
      required: true,
      unique: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      required: true,
      trim: true,
    },
    designation: {
      type: String,
      required: true,
      trim: true,
    },
    isActive: {
      type: Boolean,
      required: true,
      default: true,
    },
    colour: {
      type: String,
      required: true,
      default: '#000000',
      trim: true,
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

signSchema.post('save', async (sign) => {
  await UserModel.findOneAndUpdate({ _id: sign.userID }, { $push: { signs: sign._id } }, { new: true });
});

module.exports = model('sign', signSchema);
