const blacklistTokenModels = require('../models/blacklistToken.models');
const captionModel = require('../models/captain.model');
const captionService = require('../services/caption.service');
const {validationResult} = require('express-validator');

module.exports.registerCaption = async function(req, res, next) {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    const { fullname, email, password, vehicle } = req.body;

    const isCaptionAllReadyExist = await captionModel.findOne({email})
    if(isCaptionAllReadyExist){
        return res.status(400).json({message: 'Caption Already Exist'});
    }
    const hashPassword = await captionModel.hashPassword(password);
     const caption = await captionService.createCaption({
            firstname: fullname.firstname,
            lastname: fullname.lastname,
            email,
            password: hashPassword,
            color: vehicle.color,
            plate: vehicle.plate,
            capacity: vehicle.capacity,
            vehicleType: vehicle.vehicleType,
        });
        const token = caption.generateAuthToken();
        res.status(201).json({caption, token});
}

module.exports.loginCaption = async function(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    const caption = await captionModel.findOne({ email }).select('+password');
    if (!caption) {
        return res.status(400).json({ message: 'Caption Not Found' });
    }

    // Use the instance method on the found caption
    const isPasswordMatch = await caption.comparePassword(password);
    if (!isPasswordMatch) {
        return res.status(400).json({ message: 'Invalid Password' });
    }

    const token = caption.generateAuthToken();
    res.cookie('token', token);
    res.status(200).json({ caption, token});
}


module.exports.getProfileCaption = async function(req, res, next) {
    res.status(200).json(req.caption);
}
module.exports.logoutCaption = async function(req, res, next) {
    const token = req.cookies?.token || (req.headers?.authorization?.startsWith('Bearer ') && req.headers.authorization.split(' ')[1]);
    await blacklistTokenModels.create({token});
    res.clearCookie('token');
    res.status(200).json({message: 'Caption Logged Out'});
}