const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const bcrypt = require('bcrypt');
const pool = require('../models/db');
const { generateToken } = require('../utils/jwt');



//signup
router.post('/register', async (req, res) => {
  const { name, email, password, role, base_id } = req.body;
  const hash = await bcrypt.hash(password, 10);
  try {
    const result = await pool.query('INSERT INTO users (name, email, password, role, base_id) VALUES ($1, $2, $3, $4, $5) RETURNING *', [name, email, hash, role, base_id]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//login
router.post('/login',  async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];
    const match = await bcrypt.compare(password, user.password);
    if (!user || !match) return res.status(401).json({ error: 'Invalid Credientials' });
    const token = generateToken(user);
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;