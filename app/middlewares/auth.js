const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

module.exports = async (req, res, next) => {
    try {
        //verify if a token is provided
        const token = req.headers.auth;
        if(!token) return res.status(401).json({message: 'Accès refusé'});

        //verify if the token is valid
        try {
            const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY);
            req.user = decoded; 
        } catch (error) {
            return res.status(400).send({message: error.details[0].message});   
        }

        next();
    } catch (error) {
        res.status(401).json({ message: 'token invalide' });
    }
}