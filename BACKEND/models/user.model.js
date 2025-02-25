const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    fullName: {
        firstName: {
            type: String, 
            required: true,
            minlength: [3, 'First Name must be at least 3 character long']
        },
        lastName: {
            type: String, 
            minlength: [3, 'Last Name must be at least 3 character long']
        }
    },
    email:{
        type: String,
        required: true,
        unique: true,
        minlength: [5, 'Email must be at least 5 character long']
    },
    password:{
        type: String,
        required: true,
        select: false
    },
    socketID: {
        type: String
    }
})

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({_id: this._id}, process.env.JWT_SECRET);
    return token;
}
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password,10)
}

const User = mongoose.model('User', userSchema);

module.exports = User;
