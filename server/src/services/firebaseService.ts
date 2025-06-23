import * as admin from 'firebase-admin';
import serviceAccount from '../../../firebase-adminsdk.json';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  storageBucket: process.env.FIREBASE_BUCKET,
});

export const db = admin.firestore();
export const storage = admin.storage().bucket();
