const pool = require('../models/db');

exports.assignAsset = async (req, res) => {
  const { base_id, asset_id, personnel, quantity_assigned, quantity_expended } = req.body;
  try {
    console.log("kuch")
    const result = await pool.query('INSERT INTO assignments (base_id, asset_id, personnel, quantity_assigned, quantity_expended) VALUES ($1, $2, $3, $4, $5) RETURNING *', [base_id, asset_id, personnel, quantity_assigned, quantity_expended]);
   console.log("The db is running")
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAssignments = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM assignments ORDER BY datetime DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};