const admin = require('firebase-admin');
const serviceAccount = require('../../firebase-adminsdk.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: process.env.FIREBASE_BUCKET
});

const db = admin.firestore();
const storage = admin.storage().bucket();

module.exports = { db, storage };
