
import admin from 'firebase-admin';
import serviceAccount from './serviceAccountKey.json';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'ordforms-f488b.firebasestorage.app',
});

const bucket = admin.storage().bucket();

export default { admin, bucket };
