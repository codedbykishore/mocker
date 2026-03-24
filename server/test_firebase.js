const { db } = require('./firebase.admin');

async function test() {
  console.log('Testing Firestore connection...');
  try {
    const snapshot = await db.collection('users').limit(1).get();
    console.log('✅ Firestore connection successful!');
    console.log('Users found:', snapshot.size);
  } catch (err) {
    console.error('❌ Firestore connection failed!');
    console.error(err);
  }
}

test();
