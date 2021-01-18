import admin from 'firebase-admin';
import serviceAccount from './service_account.js';

// Utilities
import { consoleSuccess, consoleError } from '../utils/console.js';

try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });

  consoleSuccess('Project-Guava Server: Firebase Admin SDK Initialized');
} catch (error) {
  consoleError(
    new Error('Project-Guava Server: Firebase Admin SDK Initialization Error'),
    error,
  );
}

export const auth = admin.auth();
