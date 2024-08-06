const express = require('express');
const { getCountriesByCurrency } = require('../controller/countryController');
const router = express.Router();

// Fetch Countries by Currency Code
router.get('/:currencyCode', getCountriesByCurrency);

module.exports = router;
