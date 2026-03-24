const Test = require('../models/Test');
const Question = require('../models/Question');
const crypto = require('crypto');

const createTest = async (req, res) => {
    const { title, description, duration, maxParticipants, negativeMark, questions } = req.body;
    try {
        const test = await Test.create({
            creatorId: req.user.id,
            title,
            description,
            duration,
            maxParticipants,
            negativeMark,
            uniqueLink: crypto.randomUUID().slice(0, 8)
        });

        let createdQuestions = [];
        if (questions && questions.length > 0) {
            const questionsWithTestId = questions.map(q => ({ ...q, testId: test._id }));
            createdQuestions = await Question.insertMany(questionsWithTestId);
        }

        res.status(201).json({ test, questions: createdQuestions });
    } catch (err) {
        console.error('Create test error:', err);
        res.status(500).json({ message: 'Error creating test', error: err.message });
    }
};

const getTests = async (req, res) => {
    try {
        const tests = await Test.find({ creatorId: req.user.id }).sort({ createdAt: -1 });
        res.status(200).json(tests);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching tests', error: err.message });
    }
};

const getTest = async (req, res) => {
    try {
        const test = await Test.findById(req.params.id);
        const questions = await Question.find({ testId: test._id }).sort({ order: 1 });
        res.status(200).json({ test, questions });
    } catch (err) {
        res.status(500).json({ message: 'Error fetching test', error: err.message });
    }
};

const updateTest = async (req, res) => {
    const { questions, ...testData } = req.body;
    try {
        const test = await Test.findByIdAndUpdate(req.params.id, testData, { new: true });
        
        let updatedQuestions = [];
        // Always sync questions if provided in the body
        if (questions) {
            console.log(`Syncing ${questions.length} questions for test ${req.params.id}`);
            await Question.deleteMany({ testId: req.params.id });
            if (questions.length > 0) {
                // Ensure no existing _ids conflict and map to correct testId
                const questionsToInsert = questions.map(({ _id, ...q }) => ({ 
                    ...q, 
                    testId: req.params.id 
                }));
                updatedQuestions = await Question.insertMany(questionsToInsert);
                console.log(`Successfully inserted ${updatedQuestions.length} questions.`);
            }
        }

        res.status(200).json({ test, questions: updatedQuestions });
    } catch (err) {
        console.error('Update test error:', err);
        res.status(500).json({ message: 'Error updating test and questions', error: err.message });
    }
};

const publishTest = async (req, res) => {
    try {
        const test = await Test.findByIdAndUpdate(req.params.id, { status: 'published', publishedAt: new Date() }, { new: true });
        res.status(200).json(test);
    } catch (err) {
        res.status(500).json({ message: 'Error publishing test', error: err.message });
    }
};

const getTestByLink = async (req, res) => {
    try {
        const test = await Test.findOne({ uniqueLink: req.params.link, status: 'published' });
        if (!test) return res.status(404).json({ message: 'Exam not found or not published' });
        const questions = await Question.find({ testId: test._id }).sort({ order: 1 });
        res.status(200).json({ test, questions });
    } catch (err) {
        res.status(500).json({ message: 'Error fetching test', error: err.message });
    }
};

module.exports = { createTest, getTests, getTest, updateTest, publishTest, getTestByLink };
