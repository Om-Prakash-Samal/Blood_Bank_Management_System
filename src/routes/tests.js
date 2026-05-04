const express = require('express');
const router = express.Router();
const testController = require('../controllers/testController');
const { authenticateToken } = require('../middleware/auth');

router.use(authenticateToken);

router.get('/', testController.getAllTests);
router.post('/', testController.addTestResult);

module.exports = router;
