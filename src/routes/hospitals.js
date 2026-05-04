const express = require('express');
const router = express.Router();
const hospitalController = require('../controllers/hospitalController');
const { authenticateToken } = require('../middleware/auth');

router.use(authenticateToken);

router.get('/', hospitalController.getAllHospitals);
router.post('/', hospitalController.addHospital);

module.exports = router;
