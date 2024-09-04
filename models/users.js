const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    useremail: {
        type: String,
        required: true,
        unique: true
    },
    userpassword: {
        type: String,
        required: true,
        minLength: 8,
        maxLength: 20
    }
});

//Encrypting passwords and user authentication

User.pre("save", async function (next) {
    const user = this;
    if(user.isModified('userpassword') || user.isNew){
        try{
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(user.userpassword, salt);
            user.userpassword = hash;

            next();
        }catch (err){
            next(err);
        }
    }else{
        throw new Error("Something went wrong")
    }
});

//Comparing Users passwords
User.methods.comparePasswords = function (userpassword) {
    return bcrypt.compare(userpassword, this.userpassword);
}

//Generating access token for user login
User.methods.genToken = async function() {
    const token = await jwt.sign({_id: this._id}, process.env.JWT_KEY, {expiresIn: "1h"});
    return token;
}

//Authentication for the token
User.statics.authUser = function(token){
    try{
        const decode = jwt.verify(token, process.env.JWT_KEY);
        return this.findOne({_id: decode._id});

    }catch (err){
        throw new Error("Error verifying Token: ", err.message);
    }
}

module.exports = mongoose.model("HotelUsers", User);