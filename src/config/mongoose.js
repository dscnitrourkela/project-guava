import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Utilities
import logger from './winston.js';

// Configure dotenv as this is one of the first files to load
dotenv.config();

// Configuration options for mongoosee
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  poolSize: 100,
  useFindAndModify: false,
  useCreateIndex: true,
};
mongoose.connect(process.env.MONGO_APP_URI, options);

mongoose.connection.on('error', (error) => {
  logger.error(new Error('Mongoose, MongoDB SDK Initialization Error '), error);
});

mongoose.connection.once('open', () => {
  logger.info('Mongoose, MongoDB SDK Initialized');
  // eslint-disable-next-line
  console.log('-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --');
});
