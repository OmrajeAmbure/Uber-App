const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const captionSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength: [3,"First Name Must Be 3 Characters Long"]
        },
        lastname: {
            type: String,
            minlength: [3,"Last Name Must Be 3 Characters Long"]
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: [3,"Email Must Be 3 Characters Long"]
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    socketId: {
        type: String
    },
    status: {
        type: String,
        enum: ['active','inactive'],
        default: 'inactive'
    },
    vehicle :{
        color: {
            type: String,
            required: true,
            minlength: [3,"Color Must Be 3 Characters Long"]
        },
        plate:{
            type: String,
            required: true,
            minlength: [3,"Plate Must Be 3 Characters Long"]
        },
        capacity:{
            type: Number,
            required: true,
        },
        vehicleType:{
            type: String,
            enum: ['car','bike','auto'],
            default: 'car'
        }
    },
    location:{
        lat:{
            type: Number
        },
        len:{
            type: Number
        }
    }
});

captionSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id: this._id}, process.env.TOKEN_SECRET, {expiresIn: '24h'});
    return token;
}
captionSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password);
}
captionSchema.statics.hashPassword = async function(password){
    return await bcrypt.hash(password, 10);
}

const captionModel = mongoose.model('caption', captionSchema);

module.exports = captionModel;
