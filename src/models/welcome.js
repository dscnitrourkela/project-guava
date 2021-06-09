const { Schema, model } = require('mongoose');

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

module.exports = model('welcome', welcomeSchema);
