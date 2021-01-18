import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Utilities
import { consoleSuccess, consoleError } from '../utils/console.js';

// Configure dotenv as this is one of the first files to load
dotenv.config();

// Configuration options for mongoosee
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  poolSize: 100,
  useFindAndModify: false,
};
mongoose.connect(process.env.MONGO_APP_URI, options);

mongoose.connection.on('error', (error) => {
  consoleError(
    new Error(
      'Project-Guava Server: Mongoose, MongoDB SDK Initialization Error ',
    ),
    error,
  );
});

mongoose.connection.once('open', () => {
  consoleSuccess('Project-Guava Server: Mongoose, MongoDB SDK Initialized');
});
