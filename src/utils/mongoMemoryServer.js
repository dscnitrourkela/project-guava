import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoServer;
const opts = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  poolSize: 100,
  useFindAndModify: false,
};

export const beforeTest = () =>
  new Promise((resolve, reject) => {
    mongoServer = new MongoMemoryServer();
    mongoServer.getUri().then((uri) => {
      mongoose.connect(uri, opts);

      mongoose.connection.on('error', (error) => {
        reject(error);
      });

      mongoose.connection.once('open', () => {
        resolve();
      });
    });
  });

export const afterTest = async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
};
