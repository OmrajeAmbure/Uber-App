const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const userSchema = new mongoose.Schema({
    fullname: {
        firstName: {
            type: String,
            required: true,
            min: [3,'Last Name Must Be 3 Characters Long'],
            max: 255
        },
        lastName: {
            type: String,
            min: [3,'Last Name Must Be 3 Characters Long'],
            max: 255
    },
},
    email: {
        type: String,
        required: true,
        unique: true,
        min: [3,'Last Name Must Be 3 Characters Long']
    },
    password: {
        type: String,
        required: true,
        select : false
    },
    soketId:{
        type: String
    }
});    

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id: this._id}, process.env.TOKEN_SECRET, {expiresIn: '24h'});
    return token;
}   

userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password);
}
userSchema.statics.hashPassword = async function(password){
    return await bcrypt.hash(password, 10);
}

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;