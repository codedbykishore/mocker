const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  testId: { type: mongoose.Schema.Types.ObjectId, ref: 'Test', required: true },
  questionText: { type: String, required: true },
  type: { type: String, enum: ['single', 'multiple'], default: 'single' },
  options: [
    { label: String, text: String } // e.g. label 'A', text 'Option 1'
  ],
  correctAnswers: [{ type: String }], // Store labels like ["A"]
  marks: { type: Number, default: 1 },
  negativeMarks: { type: Number, default: 0 },
  order: { type: Number, default: 0 }
});

module.exports = mongoose.model('Question', questionSchema);
