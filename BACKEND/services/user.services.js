//creating user

const userModel = require('../models/user.model');

module.exports.createUser =  async ({
    firstName, lastName, email, password
}) => {
    if(!firstName || !email|| !password){
        throw new Error('All feilds are Required');
    }
    const user = await userModel.create({
        fullName:{
            firstName, 
            lastName
        }, 
        email,
        password
    })

    return user;
}

module.exports.findOne = async (filter) => {
    return await userModel.findOne(filter).select("+password");
};
