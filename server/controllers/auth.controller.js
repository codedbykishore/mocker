const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { db } = require('../firebase.admin');

const usersCollection = db.collection('users');

const register = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const querySnapshot = await usersCollection.where('email', '==', email).get();
    if (!querySnapshot.empty) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 12);
    const userDoc = await usersCollection.add({ 
      name, 
      email, 
      password: hashedPassword, 
      role: role || 'candidate',
      createdAt: new Date().toISOString()
    });

    const userData = { _id: userDoc.id, name, email, role: role || 'candidate' };
    const token = jwt.sign({ id: userDoc.id, role: userData.role }, process.env.JWT_SECRET || 'fallback_secret', { expiresIn: '1d' });

    res.status(201).json({ user: userData, token });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const querySnapshot = await usersCollection.where('email', '==', email).get();
    if (querySnapshot.empty) return res.status(404).json({ message: 'User not found' });

    const userDoc = querySnapshot.docs[0];
    const user = { _id: userDoc.id, ...userDoc.data() };

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || 'fallback_secret', { expiresIn: '1d' });

    res.status(200).json({ user: { _id: user._id, name: user.name, email: user.email, role: user.role }, token });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const getMe = async (req, res) => {
  try {
      const userDoc = await usersCollection.doc(req.user.id).get();
      if (!userDoc.exists) return res.status(404).json({ message: 'User not found' });
      
      const user = userDoc.data();
      delete user.password;
      res.status(200).json({ _id: userDoc.id, ...user });
  } catch (err) {
      console.error('getMe error:', err);
      res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const googleAuth = async (req, res) => {
  const { email, name, role } = req.body;
  try {
    const querySnapshot = await usersCollection.where('email', '==', email).get();
    let userData;
    let userId;

    if (querySnapshot.empty) {
      const dummyPassword = await bcrypt.hash(crypto.randomBytes(16).toString('hex'), 12);
      const userDoc = await usersCollection.add({ 
        name, 
        email, 
        password: dummyPassword, 
        role: role || 'candidate',
        createdAt: new Date().toISOString()
      });
      userId = userDoc.id;
      userData = { _id: userId, name, email, role: 'candidate' };
    } else {
      const userDoc = querySnapshot.docs[0];
      userId = userDoc.id;
      const data = userDoc.data();
      userData = { _id: userId, name: data.name, email: data.email, role: data.role };
    }
    const token = jwt.sign({ id: userId, role: userData.role }, process.env.JWT_SECRET || 'fallback_secret', { expiresIn: '1d' });
    res.status(200).json({ user: userData, token });
  } catch (err) {
    console.error('googleAuth error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = { register, login, getMe, googleAuth };
