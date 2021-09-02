const { date } = require('joi');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

module.exports = async (req, res, next) => {
    try {
        //verify if a token is provided
        const token = req.headers.authorization;
        if(!token) return res.status(401).json({message: 'Accès refusé'});

        //verify if the token is valid
        const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY);
        
        req.user = decoded; 

        next();
    } catch (error) {
        res.status(401).json({ message: 'token invalide' });
    }
}