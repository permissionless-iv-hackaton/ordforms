const admin = require('firebase-admin');

let serviceAccount;
let db = null;
let storage = null;

try {
  if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
  } else {
    console.log('Firebase credentials not found. Running without Firebase.');
    serviceAccount = null;
  }

  if (serviceAccount && serviceAccount.private_key && serviceAccount.client_email) {
    const adminConfig = {
      credential: admin.credential.cert(serviceAccount),
      ...(process.env.FIREBASE_BUCKET ? { storageBucket: process.env.FIREBASE_BUCKET } : {})
    };

    admin.initializeApp(adminConfig);
    db = admin.firestore();
    storage = process.env.FIREBASE_BUCKET ? admin.storage().bucket() : undefined;
    console.log('Firebase initialized successfully');
  } else {
    console.log('Firebase credentials incomplete. Running without Firebase.');
  }
} catch (error) {
  console.log('Error initializing Firebase:', error.message);
  console.log('Running without Firebase.');
}

module.exports = { db, storage };
