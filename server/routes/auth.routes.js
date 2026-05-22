const express = require('express');
const router = express.Router();
const {
  register,
  login,
  getMe,
  googleAuth,
  updateRole,
  resendVerification,
  sendOtp,
  verifyOtp,
  forgotPassword,
  resetPassword,
  forgotUsername,
  updateProfile,
} = require('../controllers/auth.controller');
const { protect } = require('../middleware/auth.middleware');

router.post('/register', register);
router.post('/login', login);
router.post('/google', googleAuth);
router.get('/me', protect, getMe);
router.post('/update-role', protect, updateRole);
router.post('/update-profile', protect, updateProfile);

// OTP verification
router.post('/send-otp', sendOtp);
router.post('/verify-otp', verifyOtp);
router.post('/resend-verification', resendVerification);

// Forgot credentials
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.post('/forgot-username', forgotUsername);

module.exports = router;
