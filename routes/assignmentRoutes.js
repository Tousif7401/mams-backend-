const express = require('express');
const router = express.Router();
const assignmentController = require('../controllers/assignmentController');
const auth = require('../middlewares/authMiddleware');
const role = require('../middlewares/roleMiddleware');

router.post('/', auth, role(['commander']), assignmentController.assignAsset);
router.get('/', auth, assignmentController.getAssignments);

module.exports = router;