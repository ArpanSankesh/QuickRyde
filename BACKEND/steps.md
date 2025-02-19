# Steps for User Registration

## Overview
This document outlines the steps taken to implement user registration using Node.js, Express, and MongoDB.

## Steps

### 1. Create User Model
- Defined a user schema using Mongoose.
- Included fields for `firstName`, `lastName`, `email`, `password`, and `socketID`.
- Added methods for generating authentication tokens and hashing passwords.

```javascript
// filepath: /d:/frontend/2025/QuickRyde/BACKEND/models/user.model.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    fullName: {
        firstName: {
            type: String,
            required: true,
            minlength: [3, 'First Name must be at least 3 characters long']
        },
        lastName: {
            type: String,
            minlength: [3, 'Last Name must be at least 3 characters long']
        }
    },
    email: {
        type: String,
        required: true,
        minlength: [5, 'Email must be at least 5 characters long']
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    socketID: {
        type: String
    }
});

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
    return token;
};

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

userSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
};

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;
```

### 2. Create User Service
- Created a service to handle the logic for creating a new user.
- The service checks if all required fields are provided.
- It saves the user data to the database.

```javascript
// filepath: /d:/frontend/2025/QuickRyde/BACKEND/services/user.services.js
const userModel = require('../models/user.model');

module.exports.createUser = async ({ firstName, lastName, email, password }) => {
    if (!firstName || !email || !password) {
        throw new Error('All fields are Required');
    }
    const user = await userModel.create({
        fullName: {
            firstName,
            lastName
        },
        email,
        password
    });

    return user;
};
```

### 3. Create User Controller
- Created a controller to handle user registration requests.
- The controller validates the request data.
- It hashes the user's password.
- Calls the service to create the user.
- Generates an authentication token for the user.
- Sends the response with the token and user details.

```javascript
// filepath: /d:/frontend/2025/QuickRyde/BACKEND/controllers/user.controller.js
const { validationResult } = require("express-validator");
const userModel = require("../models/user.model");
const userService = require("../services/user.services");

module.exports.registerUser = async (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ errors: error.array() });
    }

    const { fullName, email, password } = req.body;

    const hashedPassword = await userModel.hashPassword(password);

    const user = await userService.createUser({
        firstName: fullName.firstName,
        lastName: fullName.lastName,
        email,
        password: hashedPassword,
    });

    const token = user.generateAuthToken();

    res.status(201).json({ token, user });
};
```

### 4. Define User Routes
- Defined a route for user registration.
- Used `express-validator` to validate the incoming request data.
- Linked the route to the user controller.

```javascript
// filepath: /d:/frontend/2025/QuickRyde/BACKEND/routes/user.routes.js
const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const userController = require('../controllers/user.controller');

router.post('/register', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullName.firstName').isLength({ min: 3 }).withMessage('First Name must be at least 3 characters long'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
], userController.registerUser);

module.exports = router;
```

### Summary
- **Models**: Defined the structure and methods for user data.
- **Services**: Handled the business logic for creating a user.
- **Controllers**: Managed the request, validation, and response.
- **Routes**: Defined the API endpoints and validation rules.

This structure ensures a clean separation of concerns and makes the codebase easier to maintain and extend.
