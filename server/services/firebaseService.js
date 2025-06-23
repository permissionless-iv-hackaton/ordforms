const admin = require('firebase-admin');

let serviceAccount;
if (process.env.FIREBASE_SERVICE_ACCOUNT) {
  serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
} else {
  serviceAccount = require('../../firebase-adminsdk.json');
}

if (!serviceAccount.private_key || !serviceAccount.client_email) {
  throw new Error('Firebase credentials are missing');
}

const adminConfig = {
  credential: admin.credential.cert(serviceAccount),
  ...(process.env.FIREBASE_BUCKET ? { storageBucket: process.env.FIREBASE_BUCKET } : {})
};

admin.initializeApp(adminConfig);

const db = admin.firestore();
const storage = process.env.FIREBASE_BUCKET ? admin.storage().bucket() : undefined;


module.exports = { db, storage };
