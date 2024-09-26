const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

router.post('/complete-lecture', auth, userController.completeLecture);
router.get('/analytics', auth, userController.getUserAnalytics);

module.exports = router;