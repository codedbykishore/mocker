const admin = require('firebase-admin');
require('dotenv').config();

// If you have a service account JSON, you can use:
// const serviceAccount = require("./path/to/serviceAccountKey.json");

let app;
if (!admin.apps.length) {
  // Use environment variables for sensitive info
  const serviceAccount = {
    projectId: process.env.FIREBASE_PROJECT_ID,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  };

  if (serviceAccount.projectId && serviceAccount.privateKey && serviceAccount.clientEmail) {
    app = admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
  } else {
    // Fallback for local development if GOOGLE_APPLICATION_CREDENTIALS is set
    app = admin.initializeApp();
  }
} else {
  app = admin.app();
}

const db = admin.firestore();
const auth = admin.auth();

module.exports = { admin, db, auth };
