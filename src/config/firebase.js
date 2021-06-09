/* eslint-disable */
const admin = require('firebase-admin');
const serviceAccount = require('./service_account.js');

// Utilities
const logger = require('./winston.js');

try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });

  logger.info('Firebase Admin SDK Initialized');
} catch (error) {
  logger.error(new Error('Firebase Admin SDK Initialization Error'), error);
}

const auth = admin.auth();
module.exports = auth;
