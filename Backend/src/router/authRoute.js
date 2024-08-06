const express = require('express');
const { register, login, getUser } = require('../controller/authController');
const authenticate = require('../middleware/authenticate');
const router = express.Router();

// User Registration
router.post('/register', register);

// User Login
router.post('/login', login);

// Get User Details (Authenticated)
router.get('/user', authenticate, getUser);

module.exports = router;
