const Favorite = require('../model/favroitModel'); 
const addFavorite = async (req, res) => {
  const { countryCode } = req.body; 
  try {
    const favorite = new Favorite({
      user: req.userId,
      countryCode, 
    });
    await favorite.save();
    res.status(201).json(favorite);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getFavorites = async (req, res) => {
  try {
    const favorites = await Favorite.find({ user: req.userId });
    res.json(favorites);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { addFavorite, getFavorites };
