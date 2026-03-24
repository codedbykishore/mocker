const mongoose = require('mongoose');

const responseSchema = new mongoose.Schema({
    sessionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Session', required: true },
    questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true },
    selectedOption: { type: String, required: true },
    isCorrect: { type: Boolean },
    marksObtained: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Response', responseSchema);
