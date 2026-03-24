const express = require('express');
const router = express.Router();
const { getResult, getTestResults, getLeaderboard } = require('../controllers/result.controller');
const { protect } = require('../middleware/auth.middleware');

router.use(protect);

router.get('/:sessionId', getResult);
router.get('/test/:testId', getTestResults);
router.get('/test/:testId/leaderboard', getLeaderboard);

module.exports = router;
