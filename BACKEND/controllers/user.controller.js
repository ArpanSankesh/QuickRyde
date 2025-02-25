const { validationResult } = require("express-validator");
const userModel = require("../models/user.model");
const userService = require("../services/user.service");

module.exports.registerUser = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.array() });
  }

  const { fullName, email, password } = req.body;
  
  const hashedPassword = await userModel.hashPassword(password);

  const user = await userService.createUser({
    firstName:fullName.firstName, 
    lastName:fullName.LastName,
    email,
    password: hashedPassword,
  });

  const token = user.generateAuthToken();

  res.status(201). json({ token, user});
};

module.exports.loginUser = async (req, res, next) => {
  const error = validationResult(req);
  if(!error.isEmpty()){
    return res.status(400).json({errors: error.array()});
  }

  const {email, password} = req.body;

  try {
    const user = await userService.findOne({ email }).select('+password').exec();
    if(!user){
      return res.status(401).json({message: 'Invalid Email or Password'});
    }
  
    const isMatch = await userModel.comparePassword(password, user.password);
    if(!isMatch){
      return res.status(401).json({message: 'Invalid Email or Password'});
    }
  
    const token = user.generateAuthToken();
    res.status(200).json({token, user});
  } catch (error) {
    return res.status(500).json({message: 'Server Error'});
  }
}
