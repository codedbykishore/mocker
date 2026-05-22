const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });
const bcrypt = require('bcryptjs');
const admin = require('firebase-admin');

let key = process.env.FIREBASE_PRIVATE_KEY.trim();
if (key.startsWith('"') && key.endsWith('"')) key = key.substring(1, key.length - 1);
key = key.replace(/\\n/g, '\n');

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    privateKey: key,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  }),
});

const db = admin.firestore();

const [,, email, password, username] = process.argv;

if (!email || !password) {
  console.log('Usage: node scripts/create-admin.js <email> <password> [username]');
  console.log('Example: node scripts/create-admin.js admin@mocker.com MyAdminPass admin');
  process.exit(1);
}

(async () => {
  const existing = await db.collection('users').where('email', '==', email).get();
  if (!existing.empty) {
    console.log(`User with email "${email}" already exists. Updating to admin...`);
    const doc = existing.docs[0];
    const hashedPassword = await bcrypt.hash(password, 12);
    await doc.ref.update({
      profile: 'admin',
      role: 'admin',
      password: hashedPassword,
      isVerified: true,
      username: username || doc.data().username || email.split('@')[0],
      name: doc.data().name || 'Admin',
    });
    console.log(`Updated ${doc.id} → profile: admin, role: admin`);
    process.exit(0);
  }

  const hashedPassword = await bcrypt.hash(password, 12);
  const userData = {
    username: username || email.split('@')[0],
    name: 'Admin',
    email,
    password: hashedPassword,
    mobile: '',
    profile: 'admin',
    role: 'admin',
    isVerified: true,
    profileCompleted: true,
    createdAt: new Date().toISOString(),
  };

  const doc = await db.collection('users').add(userData);
  console.log('Admin created successfully!');
  console.log('ID:', doc.id);
  console.log('Email:', email);
  console.log('Username:', userData.username);
  process.exit(0);
})().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
