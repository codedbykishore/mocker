# AGENTS.md

## Project Structure

- **Client** (`/client`): React 18 + Vite + Tailwind + Zustand
- **Server** (`/server`): Express + MongoDB + Firebase Admin

## Commands

From **root** directory:
```bash
npm run install-all   # Install all dependencies (root + client + server)
npm run dev         # Run both client and server concurrently
```

From **/client**:
```bash
npm run dev         # Start dev server
npm run build      # Production build
npm run preview    # Preview production build
```

From **/server**:
```bash
npm run dev       # Start with nodemon
npm start        # Start production
```

## Key Details

- **ESM vs CommonJS**: Client uses ESM (`"type": "module"` in package.json), server uses CommonJS
- **Environment**: Single `.env` in root directory; server reads it via `dotenv`
- **No test framework** configured
- **No lint/typecheck scripts** - use `npx eslint src/` in client if needed

## Before Committing

Always run `npm run build` in `/client` to verify client compiles.

## Firestore User Management

Run these from `/server` directory (uses `dotenv` to read root `.env` automatically).

### List all registered users
```bash
node -e "
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const admin = require('firebase-admin');
let key = process.env.FIREBASE_PRIVATE_KEY.trim();
if (key.startsWith('\"') && key.endsWith('\"')) key = key.substring(1, key.length - 1);
key = key.replace(/\\\\n/g, '\n');
admin.initializeApp({ credential: admin.credential.cert({
  projectId: process.env.FIREBASE_PROJECT_ID, privateKey: key,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
})});
admin.firestore().collection('users').get().then(snap => {
  if (snap.empty) return console.log('No users.');
  console.log('Email'.padEnd(35), 'Username'.padEnd(18), 'Profile'.padEnd(10), 'Role'.padEnd(12), 'Name');
  console.log('-'.repeat(85));
  snap.forEach(d => {
    const u = d.data();
    console.log(
      (u.email || '—').padEnd(35),
      (u.username || '—').padEnd(18),
      (u.profile || '—').padEnd(10),
      (u.role || '—').padEnd(12),
      u.name || '—'
    );
  });
  process.exit(0);
}).catch(e => { console.error(e.message); process.exit(1); });
"
```

### Create an admin account
```bash
node scripts/create-admin.js <email> <password> [username]
# Example:
node scripts/create-admin.js admin@mocker.com password123 admin
```

### Delete users by email
```bash
node -e "
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const admin = require('firebase-admin');
let key = process.env.FIREBASE_PRIVATE_KEY.trim();
if (key.startsWith('\"') && key.endsWith('\"')) key = key.substring(1, key.length - 1);
key = key.replace(/\\\\n/g, '\n');
admin.initializeApp({ credential: admin.credential.cert({
  projectId: process.env.FIREBASE_PROJECT_ID, privateKey: key,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
})});
const db = admin.firestore();
const emails = ['email1@gmail.com', 'email2@gmail.com'];  // ← change these
Promise.all(emails.map(email =>
  db.collection('users').where('email', '==', email).get().then(snap => {
    if (snap.empty) return console.log('Not found:', email);
    return Promise.all(snap.docs.map(d => d.ref.delete().then(() => console.log('Deleted:', email))));
  })
)).then(() => { console.log('Done.'); process.exit(0); }).catch(e => { console.error(e.message); process.exit(1); });
"
```

**How it works:** The scripts import Firebase Admin from `server/node_modules`, read credentials from `.env`, initialize the SDK, query the `users` collection by email field, and either log or delete matching documents.

## Do Not Modify

- ESLint configuration
- Project structure assumptions