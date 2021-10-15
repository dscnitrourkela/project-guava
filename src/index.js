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
// require('./config/firebase.js');
require('./config/cloudinary.js');

// Create Express app instance
const app = express();

// Setup Cross-Origin Resource Sharing for the development environment
// localhost:3000 would be the frontend port on which the app is running
const whitelist = {
  prod: ['https://signit.dscnitrourkela.org', 'https://studio.apollographql.com'],
  dev: ['http://localhost:3000', 'https://studio.apollographql.com', 'http://localhost:8000'],
};
const corsOptions = {
  origin: (origin, callback) => {
    const env = process.env.NODE_ENV === 'production' ? 'prod' : 'dev';
    if (!origin) {
      callback(null, true);
    } else if (whitelist[env].indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
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
