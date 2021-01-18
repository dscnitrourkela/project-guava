import admin from 'firebase-admin';
import serviceAccount from './service_account.js';

try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });

  console.info('Project-Guava Server: Firebase Admin SDK Initialized');
} catch (error) {
  console.error(
    new Error('Project-Guava Server: Firebase Admin SDK Initialization Error'),
    error,
  );
}

export const auth = admin.auth();
