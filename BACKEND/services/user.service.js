const User = require('../models/user.model'); // Ensure this is a Mongoose model

module.exports.findOne = (query) => {
    return User.findOne(query); // This returns a Mongoose query object
};

module.exports.createUser = (userData) => {
    const user = new User(userData);
    return user.save();
};
