
import admin from 'firebase-admin';
import serviceAccount from './serviceAccountKey.json' assert { type: 'json' };

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'ordforms-f488b.firebasestorage.app',
});

const bucket = admin.storage().bucket();
const db = admin.firestore();


export default { admin, bucket, db };
