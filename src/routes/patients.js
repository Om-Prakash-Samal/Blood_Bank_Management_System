const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');
const { authenticateToken } = require('../middleware/auth');

router.use(authenticateToken);

router.get('/', patientController.getAllPatients);
router.post('/', patientController.addPatient);

module.exports = router;
