const mongoose = require('mongoose');

const testSchema = new mongoose.Schema({
  creatorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: String,
  duration: { type: Number, required: true }, // in minutes
  maxParticipants: { type: Number, default: 10 },
  currentParticipants: { type: Number, default: 0 },
  uniqueLink: { type: String, unique: true },
  status: { type: String, enum: ['draft', 'published', 'closed'], default: 'draft' },
  isRandomized: { type: Boolean, default: false },
  negativeMark: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  publishedAt: Date
});

module.exports = mongoose.model('Test', testSchema);
