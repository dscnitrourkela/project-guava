//TODO: Check if pm2-runtme works
// Libraries
const express = require('express');
const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');
const { ApolloServer } = require('apollo-server-express');
const fetch = require('node-fetch');

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

const AUTH0_DOMAIN = 'signit.eu.auth0.com';

const authClient = jwksClient({
  jwksUri: `https://${AUTH0_DOMAIN}/.well-known/jwks.json`,
});

const getKey = (header, callback) => {
  authClient.getSigningKey(header.kid, (err, key) => {
    const signingKey = key.getPublicKey();
    callback(null, signingKey);
  });
};

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
    context: async ({ req }) => {
      const authHeader = req.headers.authorization;
      const token = authHeader?.startsWith('Bearer ') ? authHeader.substring(7) : null;
      const decodedToken = await new Promise((resolve, reject) => {
        jwt.verify(
          token,
          getKey,
          {
            algorithms: ['RS256'],
            audience: [`https://${AUTH0_DOMAIN}/userinfo`],
            issuer: `https://${AUTH0_DOMAIN}/`,
          },
          (err, decoded) => {
            if (err) {
              reject(err);
            } else {
              resolve(decoded);
            }
          }
        );
      }).catch((err) => {
        logger.error(err);
        return null;
      });
      if (!decodedToken) {
        return { decodedToken };
      }
      const userDetailsByIdUrl = `https://${AUTH0_DOMAIN}/api/v2/users/${decodedToken.sub}`;
      const userDetails = await fetch(userDetailsByIdUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .catch(() => null);

      return {
        decodedToken: { email: userDetails?.email, email_verified: userDetails?.email_verified, ...decodedToken },
      };
    },
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

  logger.info(`Apollo-Express Server Started on Port ${PORT} with ENV as ${process.env.NODE_ENV}`);
});
