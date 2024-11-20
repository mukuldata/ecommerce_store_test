const express = require('express');
const { getUserProfile } = require('../controllers/userController');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

// Protected route for user profile
router.get('/profile', protect, getUserProfile);

module.exports = router;
