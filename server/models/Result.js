const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
  sessionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Session', required: true },
  testId: { type: mongoose.Schema.Types.ObjectId, ref: 'Test', required: true },
  candidateId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  totalMarks: Number,
  scoredMarks: Number,
  attempted: Number,
  unattempted: Number,
  correct: Number,
  incorrect: Number,
  accuracy: Number,
  rank: Number,
  submittedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Result', resultSchema);
