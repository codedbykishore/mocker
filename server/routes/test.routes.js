const express = require('express');
const router = express.Router();
const { createTest, getTests, getTest, updateTest, publishTest, getTestByLink } = require('../controllers/test.controller');
const { protect, requireRole } = require('../middleware/auth.middleware');

router.use(protect);
router.get('/link/:link', getTestByLink);
router.use(requireRole('creator'));

router.post('/', createTest);
router.get('/', getTests);
router.get('/:id', getTest);
router.put('/:id', updateTest);
router.put('/:id/publish', publishTest);

module.exports = router;
