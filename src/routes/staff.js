const express = require('express');
const router = express.Router();
const staffController = require('../controllers/staffController');
const { authenticateToken } = require('../middleware/auth');

router.use(authenticateToken);

router.get('/', staffController.getAllStaff);
router.post('/', staffController.addStaff);

module.exports = router;
