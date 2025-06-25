const express = require('express');
const router = express.Router();
const transferController = require('../controllers/transferController');
const auth = require('../middlewares/authMiddleware');
const role = require('../middlewares/roleMiddleware');

router.post('/request', auth, role(['commander']), transferController.requestTransfer);
router.post('/process', auth, role(['logistics']), transferController.processTransfer);
router.get('/', auth, transferController.getTransfers);

module.exports = router;