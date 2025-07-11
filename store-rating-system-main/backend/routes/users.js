// routes/users.js
const express = require('express');
const router = express.Router();

const { registerUser } = require('../controllers/authController');
const { getAllUsers } = require('../controllers/userController');
const validateUser = require('../middleware/validateUser');

// Register new user
router.post('/add_user', validateUser, registerUser);

// Get all users (UNPROTECTED)
router.get('/all_users', getAllUsers);

module.exports = router;
