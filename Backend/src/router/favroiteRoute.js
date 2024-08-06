const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');
const { addFavorite, getFavorites } = require('../controller/favoriteController');

// Add Country to Favorites
router.post('/', authenticate, addFavorite);

// Get User's Favorite Countries
router.get('/', authenticate, getFavorites);

module.exports = router;
