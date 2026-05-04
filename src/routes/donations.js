const express = require('express');
const router = express.Router();
const donationController = require('../controllers/donationController');
const { authenticateToken } = require('../middleware/auth');

router.use(authenticateToken);

router.get('/', donationController.getAllDonations);
router.post('/', donationController.addDonation);

module.exports = router;
