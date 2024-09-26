const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const auth = require('../middleware/auth');

router.get('/users', adminController.getAllUsers);
router.post('/assign-course', adminController.assignCourse);
router.get('/analytics', adminController.getAnalytics);

module.exports = router;