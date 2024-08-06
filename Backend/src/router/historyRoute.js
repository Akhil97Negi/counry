const express = require('express');
const authenticate = require('../middleware/authenticate');
const { addSearchToHistory, getSearchHistory } = require('../controller/historyController');
const router = express.Router();

// Add Search to History
router.post('/', authenticate, addSearchToHistory);

// Get User's Search History
router.get('/', authenticate, getSearchHistory);

module.exports = router;
