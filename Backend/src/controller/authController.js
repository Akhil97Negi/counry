
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userModel = require('../model/userModel');
const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new userModel({ name, email, password: hashedPassword });
    await user.save();
    const token = jwt.sign({ userId: user._id }, 'your_jwt_secret');
    res.status(201).json({ data: {
      _id: user._id,
      email: user.email,
    },
    message: "New user has been registered", });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user._id }, 'your_jwt_secret');
    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await userModel.findById(req.userId);
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { register, login, getUser };
