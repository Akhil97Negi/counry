const axios = require('axios');

const getCountriesByCurrency = async (req, res) => {
  const { currencyCode } = req.params;
  try {
    const response = await axios.get(`https://restcountries.com/v3.1/currency/${currencyCode}`);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getCountriesByCurrency };
