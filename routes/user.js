const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const userController = require('../controllers/userController');

// User registration
router.post(
  '/register',
  [
    body('username').notEmpty(),
    body('email').isEmail(),
    body('gender').isIn(['male', 'female', 'other']),
    body('password').isLength({ min: 6 }),
  ],
  userController.register
);

// User login
router.post('/login', userController.login);

module.exports = router;
