const express = require('express');
const router = express.Router();
const { downloadTicket } = require('../controllers/registrationController');
const registrationController = require('../controllers/registrationController');
const { protect } = require('../middleware/authMiddleware');

// Ticket download route
router.get('/ticket/:id', protect, registrationController.downloadTicket);

module.exports = router;
