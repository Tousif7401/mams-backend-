const pool = require('../models/db');

exports.requestTransfer = async (req, res) => {
    console.log("this is the transfer request")
    console.log('Request body:', req.body);
    console.log('User:', req.user);
  const { from_base_id, to_base_id, asset_id, quantity } = req.body;
   try {
    const result = await pool.query(
      'INSERT INTO transfers (from_base_id, to_base_id, asset_id, quantity, status) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [from_base_id, to_base_id, asset_id, quantity, 'requested']
    );
    res.status(201).json({ message: 'Transfer requested', data: result.rows[0] });
  } catch (err) {
    console.error('Error requesting transfer:', err);
    res.status(500).json({ error: 'Internal server error' });
  }

};

exports.processTransfer = async (req, res) => {
  const { transfer_id } = req.body;
  try {
    const result = await pool.query('UPDATE transfers SET status = $1 WHERE id = $2 RETURNING *', ['transferred', transfer_id]);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getTransfers = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM transfers ORDER BY datetime DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};