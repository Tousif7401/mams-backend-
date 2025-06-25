const pool = require('../models/db');

exports.addPurchase = async (req, res) => {
  const { base_id, asset_id, quantity } = req.body;
  const log_base_id=req.user.base_id
  if(base_id===log_base_id){
  console.log(req.user,"this is the user ")
  try {
    const result = await pool.query('INSERT INTO purchases (base_id, asset_id, quantity) VALUES ($1, $2, $3) RETURNING *', [base_id, asset_id, quantity]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
  }else{
    res.send("Unauthorized Purchase")
  }
};

exports.getPurchases = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM purchases ORDER BY datetime DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};