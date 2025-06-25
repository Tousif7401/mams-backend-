const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const pool = require('../models/db');
const { generateToken } = require('../utils/jwt');



//signup
router.post('/register', async (req, res) => {
  const { name, email, password, role, base_id } = req.body;
console.log(name, email, password, role, base_id )
  try {
    const existing = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (existing.rows.length > 0) {
      return res.status(400).json({ error: 'User already exists' });
    }
    const hash = await bcrypt.hash(password, 10)
    const result = await pool.query(
      'INSERT INTO users (name, email, password, role, base_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, email, hash, role, parseInt(base_id)]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Register Error:", err);
    res.status(500).json({ error: err.message });
  }
});


//login
router.post('/login',  async (req, res) => {
  const { email, password } = req.body;
  console.log(email,password)
  console.log(typeof email,typeof password)
  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];
    console.log(result.rows[0])
    if(result.rows[0]){
    const match = await bcrypt.compare(password, user.password);
    console.log("this is the match",match)
    if (!user || !match) return res.status(401).json({ error: 'Invalid Credientials' });
    const token = generateToken(user);
    console.log(token)
    res.json({ token });

  
  }else{
    res.send("invalid creds")
  }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;