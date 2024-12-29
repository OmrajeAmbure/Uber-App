const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const blacklistedTokenModel = require('../models/blacklistToken.models');
const captionModel = require('../models/captain.model');

module.exports.authUser = async (req, res, next) => {
    try {
        // Safely access token from cookies or Authorization header
        const token =
            req.cookies?.token || // Optional chaining for cookies
            (req.headers?.authorization?.startsWith('Bearer ') && req.headers.authorization.split(' ')[1]);

        const isBlacklisted = await blacklistedTokenModel.findOne({ token: token });
        if(isBlacklisted){
            return res.status(401).json({message: 'Unauthorized: Token is blacklisted'});
        }
        // If no token is found, return an unauthorized error
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized: No token provided' });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);

        // Find the user in the database
        const user = await userModel.findById(decoded._id);

        // If user doesn't exist, return an unauthorized error
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized: User not found' });
        }

        // Attach user to the request object and proceed
        req.user = user;
        return next();
    } catch (error) {
        console.error('Auth middleware error:', error.message); // Log error for debugging
        return res.status(401).json({ message: 'Unauthorized' });
    }
};

module.exports.authCaption = async (req, res, next) => {
    const token = req.cookies?.token || (req.headers?.authorization?.startsWith('Bearer ') && req.headers.authorization.split(' ')[1]);
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }
    const isBlacklisted = await blacklistedTokenModel.findOne({ token: token });
    if(isBlacklisted){
        return res.status(401).json({message: 'Unauthorized: Token is blacklisted'});
    }
    try {
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        const caption = await captionModel.findById(decoded._id);
        if (!caption) {
            return res.status(401).json({ message: 'Unauthorized: Caption not found' });
        }
        req.caption = caption;
        
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
};