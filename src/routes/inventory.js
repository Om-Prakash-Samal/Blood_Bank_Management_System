const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');
const { authenticateToken } = require('../middleware/auth');

router.use(authenticateToken);

router.get('/', inventoryController.getAllBloodBags);
router.put('/:id', inventoryController.updateBloodBagStatus);

module.exports = router;
