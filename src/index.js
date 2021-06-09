// Libraries
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';

// GraphQL Schema
import schema from './graphql/index.js';

// Utilities
import logger from './config/winston.js';

// Initialize Firebase, Mongoose, Cloudinary Admin SDK
import './config/mongoose.js';
import './config/firebase.js';
import './config/cloudinary.js';

// Create Express app instance
const app = express();

// Setup Cross-Origin Resource Sharing for the development environment
// localhost:3000 would be the frontend port on which the app is running
const corsOptions = {
  origin: process.env.NODE_ENV !== 'production' ? 'http://localhost:3000' : 'https://certificate.dscnitrourkela.org',
};

// Middlewares
// JSON and Encoded URL Body Parser, Use Cors
app.use(express.json());
app.use(cors(corsOptions));

// Initialize Apollo Server
const apolloServer = new ApolloServer({
  schema,
  cors: corsOptions,
  playground: process.env.NODE_ENV !== 'production',
  debug: process.env.NODE_ENV !== 'production',
});

// Attach Express Server with Apollo Server
apolloServer.applyMiddleware({ app, path: '/', cors: corsOptions });

// Start Express Server on defined port
const PORT = process.env.PORT || 8000;
app.listen(PORT, (error) => {
  if (error) {
    logger(new Error(`Apollo-Express Server Error on Port ${PORT}`), error);
  }

  logger.info(`Apollo-Express Server Started on Port ${PORT}`);
});
