const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret123');

      // In Demo Mode, we just attach a mock user object with the ID from token
      // In DB mode, we fetch from DB
      const mongoose = require('mongoose');
      if (mongoose.connection.readyState === 1) {
         req.user = await User.findById(decoded.id).select('-password');
      } else {
         req.user = { id: decoded.id }; // Mock user ID for demo
      }

      if (!req.user) {
        return res.status(401).json({ message: 'Not authorized' });
      }

      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Not authorized' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = { protect };
