const pool = require('../models/db');

exports.getDashboard = async (req, res) => {
  const baseId = req.query.base_id;
  try {
    const [purchases, transfersIn, transfersOut, assignments] = await Promise.all([
      pool.query('SELECT SUM(quantity) FROM purchases WHERE base_id = $1', [baseId]),
      pool.query('SELECT SUM(quantity) FROM transfers WHERE to_base_id = $1 AND status = $2', [baseId, 'transferred']),
      pool.query('SELECT SUM(quantity) FROM transfers WHERE from_base_id = $1 AND status = $2', [baseId, 'transferred']),
      pool.query('SELECT SUM(quantity_assigned) as assigned, SUM(quantity_expended) as expended FROM assignments WHERE base_id = $1', [baseId])
    ]);

    const openingBalance = purchases.rows[0].sum || 0;
    const netMovement = (transfersIn.rows[0].sum || 0) - (transfersOut.rows[0].sum || 0);
    const assigned = assignments.rows[0].assigned || 0;
    const expended = assignments.rows[0].expended || 0;

    const closingBalance = openingBalance + netMovement - assigned - expended;

    res.json({
      openingBalance,
      netMovement,
      assigned,
      expended,
      closingBalance
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};