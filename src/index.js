// Libraries
const express = require('express');
const { ApolloServer } = require('apollo-server-express');

const cors = require('cors');

// GraphQL Schema
const schema = require('./graphql/index.js');

// Utilities
const logger = require('./config/winston.js');

// Initialize Firebase, Mongoose, Cloudinary Admin SDK
require('./config/mongoose.js');
require('./config/firebase.js');
require('./config/cloudinary.js');

// Create Express app instance
const app = express();

// Setup Cross-Origin Resource Sharing for the development environment
// localhost:3000 would be the frontend port on which the app is running
const corsOptions = {
  origin: process.env.NODE_ENV !== 'production' ? 'http://localhost:3000' : 'https://signit.dscnitrourkela.org',
};

// Middlewares
// JSON and Encoded URL Body Parser, Use Cors
app.use(express.json());
app.use(cors(corsOptions));

async function startServer() {
  // Initialize Apollo Server
  const apolloServer = new ApolloServer({
    schema,
    cors: corsOptions,
    playground: process.env.NODE_ENV !== 'production',
    debug: process.env.NODE_ENV !== 'production',
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({ app, path: '/', cors: corsOptions });
}
startServer();

// Attach Express Server with Apollo Server

// Start Express Server on defined port
const PORT = process.env.PORT || 8000;

app.listen(PORT, (error) => {
  if (error) {
    logger(new Error(`Apollo-Express Server Error on Port ${PORT}`), error);
  }

  logger.info(`Apollo-Express Server Started on Port ${PORT}`);
});
