const express = require('express');
const router = express.Router();
const requestController = require('../controllers/requestController');
const { authenticateToken } = require('../middleware/auth');

router.use(authenticateToken);

router.get('/', requestController.getAllRequests);
router.post('/', requestController.addRequest);
router.put('/:id/assign', requestController.assignBag);

module.exports = router;
