const History = require('../model/historyModel');



const addSearchToHistory = async (req, res) => {
  const { search } = req.body;
  try {
    const history = new History({
      user: req.userId,
      search,
    });
    await history.save();
    const historyItems = await History.find({ user: req.userId }).sort({ createdAt: -1 }).limit(5);
    res.json(historyItems);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getSearchHistory = async (req, res) => {
  try {
    const historyItems = await History.find({ user: req.userId }).sort({ createdAt: -1 }).limit(5);
    res.json(historyItems);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { addSearchToHistory, getSearchHistory };
