const express = require('express');
const router = express.Router();
const purchaseController = require('../controllers/purchaseController');
const auth = require('../middlewares/authMiddleware');
const role = require('../middlewares/roleMiddleware');
// change here 
// router.post('/', auth, role(['logistics']), purchaseController.addPurchase);
router.post('/', auth, role(['logistics']), purchaseController.addPurchase);
router.get('/', auth, purchaseController.getPurchases);

module.exports = router;