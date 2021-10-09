const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Utilities
const logger = require('./winston.js');

// Configure dotenv as this is one of the first files to load
dotenv.config();

mongoose.connect(process.env.MONGO_APP_URI);

mongoose.connection.on('error', (error) => {
  logger.error(new Error('Mongoose, MongoDB SDK Initialization Error '), error);
});

mongoose.connection.once('open', () => {
  logger.info('Mongoose, MongoDB SDK Initialized');
  // eslint-disable-next-line
  console.log('-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --');
});
