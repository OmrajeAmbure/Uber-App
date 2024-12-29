const userModel = require('../models/user.model');
const userService = require('../services/user.service');
const {validationResult} = require('express-validator');
const blacklistTokenSchema = require('../models/blacklistToken.models');

module.exports.registerUser = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    const isUserAllReadyExist = await userModel.findOne({email})
    if(isUserAllReadyExist){
        return res.status(400).json({message: 'User Already Exist'});
    }
    try {
        const {fullname, email, password} = req.body;
        const hashPassword = await userModel.hashPassword(password);
        const user = await userService.createUser({firstname:fullname.firstname, lastname:fullname.lastname, email, password: hashPassword});
        const token = user.generateAuthToken();
        res.status(201).json({message: 'User Created Successfully', user, token});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}    
module.exports.loginUser = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    const {email, password} = req.body;

    const user = await userModel.findOne({email}).select('+password');
    if(!user){
        return res.status(401).json({message: 'Invalid Email or Password'});
    }
    const isMatch = await user.comparePassword(password);
    if(!isMatch){
        return res.status(401).json({message: 'Invalid Email or Password'});
    }
    const token = user.generateAuthToken();
    res.cookie('token',token,{});
    res.status(200).json({message: 'User Logged In Successfully', token, user});
}
module.exports.getProfile = async (req, res, next) => {
    res.status(200).json(req.user);
}
module.exports.logoutUser = async (req, res, next) => {
    res.clearCookie('token');
    const token = req.cookies.token|| (req.headers.authorization && req.headers.authorization.split(' ')[1]);
    await blacklistTokenSchema.create({token});
    
    res.status(200).json({message: 'User Logged Out Successfully'});
}