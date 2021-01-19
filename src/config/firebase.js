/* eslint-disable */
import admin from 'firebase-admin';
import serviceAccount from './service_account.js';

// Utilities
import logger from './winston.js';

try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });

  logger.info('Firebase Admin SDK Initialized');
} catch (error) {
  logger.error(new Error('Firebase Admin SDK Initialization Error'), error);
}

export const auth = admin.auth();
