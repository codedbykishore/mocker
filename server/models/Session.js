const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  testId: { type: mongoose.Schema.Types.ObjectId, ref: 'Test', required: true },
  candidateId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  startTime: { type: Date, default: Date.now },
  endTime: Date,
  status: { type: String, enum: ['active', 'submitted', 'terminated'], default: 'active' },
  violations: { type: Number, default: 0 },
  cameraEnabled: { type: Boolean, default: false },
  micEnabled: { type: Boolean, default: false },
  ipAddress: String,
  userAgent: String
});

module.exports = mongoose.model('Session', sessionSchema);
