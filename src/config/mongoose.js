import mongoose from 'mongoose';
import dotenv from 'dotenv';

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
  console.error(
    new Error('Project-Guava Server: Mongoose, MongoDB initialization error '),
    error,
  );
});

mongoose.connection.once('open', () => {
  console.info(
    'Project-Guava Server: Mongoose, MongoDB initialization success',
  );
});
