const express = require('express');
const router = express.Router();
const { startSession, logViolation, submitExam } = require('../controllers/session.controller');
const { protect } = require('../middleware/auth.middleware');

router.use(protect);

router.post('/start', startSession);
router.post('/:sessionId/violation', logViolation);
router.post('/:sessionId/submit', submitExam);

module.exports = router;
