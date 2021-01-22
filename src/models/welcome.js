import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const welcomeSchema = new Schema({
  message: {
    type: String,
    required: true,
    default: 'Apollo-Server is working!',
  },
  status: {
    type: Number,
    required: true,
    default: 200,
  },
});

export default model('welcome', welcomeSchema);
