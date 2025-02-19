const { validationResult } = require("express-validator");
const userModel = require("../models/user.model");
const userService = require("../services/user.services");

module.exports.registerUser = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.array() });
  }

  const { firstName, lastName, email, password } = req.body;
  
  const hashedPassword = await userModel.hashPassword(password);

  const user = await userService.createUser({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });

  const token = user.generateAuthToken();

  res.status(201). json({ token, user});
};
