const mongoose = require('mongoose');
const bcrpyt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    fullName: {
        firstName: {
            type: String, 
            required: true,
            minlength: [3, 'First Name must be at least 3 character long']
        },
        LastName: {
            type: String, 
            minlength: [3, 'Last Name must be at least 3 character long']
        }
    },
    email:{
        type: String,
        required: true,
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
    const token = jwt.sign({_id: this._id}, process.env.JWT_SECRET)
}
userSchema.methods.comparePassword = async function () {
    return await bcrpyt.compare(password, this.password)
}

userSchema.static.hashPassword = async function () {
    return await bcrpyt.hash(password,10)
}

const userModel = mongoose.model('user', userSchema)

module.exports = userModel;
