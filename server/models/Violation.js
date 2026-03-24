const mongoose = require('mongoose');

const violationSchema = new mongoose.Schema({
    sessionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Session', required: true },
    type: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    metadata: { type: Object }
});

module.exports = mongoose.model('Violation', violationSchema);
