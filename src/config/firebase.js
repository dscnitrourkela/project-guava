import admin from 'firebase-admin';
import serviceAccount from './service_account.js';

// Utilities
import logger from './winston.js';

try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });

  logger.info('Project-Guava Server: Firebase Admin SDK Initialized');
} catch (error) {
  logger.error(
    new Error('Project-Guava Server: Firebase Admin SDK Initialization Error'),
    error,
  );
}

export const auth = admin.auth();
