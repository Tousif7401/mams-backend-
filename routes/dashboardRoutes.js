const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const auth = require('../middlewares/authMiddleware');

router.get('/', auth, dashboardController.getDashboard);
// router.get('/', dashboardController.getDashboard);

module.exports = router;