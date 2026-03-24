const Session = require('../models/Session');
const Test = require('../models/Test');
const Question = require('../models/Question');
const Response = require('../models/Response');
const Result = require('../models/Result');
const Violation = require('../models/Violation');

const startSession = async (req, res) => {
    const { testId } = req.body;
    try {
        const test = await Test.findById(testId);
        if (!test) return res.status(404).json({ message: 'Test not found' });

        const session = await Session.create({
            testId,
            candidateId: req.user.id,
            startTime: new Date(),
            status: 'active'
        });
        res.status(201).json({ session });
    } catch (err) {
        res.status(500).json({ message: 'Error starting session', error: err.message });
    }
};

const logViolation = async (req, res) => {
    const { sessionId } = req.params;
    const { type, count } = req.body;
    try {
        await Session.findByIdAndUpdate(sessionId, { $inc: { violations: 1 } });
        // Optionally create a Violation detail entry
        res.status(200).json({ success: true });
    } catch (err) {
        res.status(500).json({ message: 'Error logging violation', error: err.message });
    }
};

const submitExam = async (req, res) => {
    const { sessionId } = req.params;
    const { answers } = req.body; // Map: { questionIdx: 'A' }
    try {
        const session = await Session.findByIdAndUpdate(sessionId, { status: 'submitted', endTime: new Date() }, { new: true });
        const questions = await Question.find({ testId: session.testId }).sort({ order: 1 });

        let totalMarks = 0, scoredMarks = 0;
        let correct = 0, incorrect = 0, attempted = 0;

        questions.forEach((q, idx) => {
            totalMarks += q.marks;
            const selectedOpt = answers[idx];
            
            if (selectedOpt) {
                attempted += 1;
                const isCorrect = q.correctAnswers.includes(selectedOpt);
                if (isCorrect) {
                   scoredMarks += q.marks;
                   correct += 1;
                } else {
                   scoredMarks -= q.negativeMarks;
                   incorrect += 1;
                }
            }
        });

        const unattempted = questions.length - attempted;
        const accuracy = attempted > 0 ? (correct / attempted * 100).toFixed(2) : 0;

        const result = await Result.create({
            sessionId,
            testId: session.testId,
            candidateId: session.candidateId,
            totalMarks,
            scoredMarks: Math.max(0, scoredMarks),
            attempted,
            unattempted,
            correct,
            incorrect,
            accuracy,
            submittedAt: new Date()
        });

        res.status(200).json({ success: true, result });
    } catch (err) {
        res.status(500).json({ message: 'Error submitting exam', error: err.message });
    }
};

module.exports = { startSession, logViolation, submitExam };
