const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = require('../models/User');

// Mock Data Storage
let MOCK_USERS = [];
let nextUserId = 1;

const isDBConnected = () => mongoose.connection.readyState === 1;

// @desc    Register new user
// @route   POST /api/auth
// @access  Public
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please add all fields' });
    }

    // DB Mode
    if (isDBConnected()) {
      const userExists = await User.findOne({ email });
      if (userExists) return res.status(400).json({ message: 'User already exists' });

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const user = await User.create({ name, email, password: hashedPassword });

      return res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    }

    // Mock Mode
    const userExists = MOCK_USERS.find(u => u.email === email);
    if (userExists) return res.status(400).json({ message: 'User already exists (Demo Mode)' });

    const newUser = {
      _id: String(nextUserId++),
      name,
      email,
      password, // In demo mode we don't strictly need to hash, but good for demo
      createdAt: new Date().toISOString()
    };
    MOCK_USERS.push(newUser);

    res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      token: generateToken(newUser._id),
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Authenticate a user
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // DB Mode
    if (isDBConnected()) {
      const user = await User.findOne({ email });
      if (user && (await bcrypt.compare(password, user.password))) {
        return res.json({
          _id: user.id,
          name: user.name,
          email: user.email,
          token: generateToken(user._id),
        });
      }
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Mock Mode
    const user = MOCK_USERS.find(u => u.email === email && u.password === password);
    if (user) {
      return res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    }
    res.status(400).json({ message: 'Invalid credentials (Demo Mode)' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get user data
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res) => {
  res.status(200).json(req.user);
};

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'secret123', {
    expiresIn: '30d',
  });
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
};
