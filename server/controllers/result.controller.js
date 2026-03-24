const Result = require('../models/Result');
const Session = require('../models/Session');
const Test = require('../models/Test');

const getResult = async (req, res) => {
    const { sessionId } = req.params;
    try {
        const result = await Result.findOne({ sessionId }).populate('testId');
        if (!result) return res.status(404).json({ message: 'Result not found' });
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching result', error: err.message });
    }
};

const getTestResults = async (req, res) => {
    const { testId } = req.params;
    try {
        const results = await Result.find({ testId })
            .populate('candidateId', 'name email')
            .sort({ scoredMarks: -1 });
        res.status(200).json(results);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching test results', error: err.message });
    }
};

const getLeaderboard = async (req, res) => {
    const { testId } = req.params;
    try {
        const results = await Result.find({ testId })
            .populate('candidateId', 'name')
            .sort({ scoredMarks: -1 })
            .limit(10);
        res.status(200).json(results);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching leaderboard', error: err.message });
    }
};

module.exports = { getResult, getTestResults, getLeaderboard };
