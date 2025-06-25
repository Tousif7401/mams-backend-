const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateToken = (user) => {
  return jwt.sign({ id: user.id, role: user.role, base_id: user.base_id }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

module.exports = { generateToken };