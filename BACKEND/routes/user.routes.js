const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const userController = require('../controllers/user.controller')


router.post('/register', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullName.firstName').isLength({min: 3}).withMessage('First Name must be at least 3 character long'),
    body('password').isLength({min: 6}).withMessage('Password must be at least 6 character long'),

], userController.registerUser)

module.exports = router;