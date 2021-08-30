const User = require('../models/userModel');
const authValidation = require('../validation/auth');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.logIn = async (req, res) => {
    try {
        const loginData = req.body;

        //JOI
        try {
            await authValidation.validateAsync(loginData);
        } catch (error) {
            return res.status(400).send({message: error.details[0].message});        
        }

        //Check mail
        const user = await User.findOne({mail: loginData.mail});
        if(!user) return res.status(400).json({message: 'email ou mot de passe invalide'});

        //Check password
        const match = await bcrypt.compare(loginData.password, user.password);
        if(!match) return res.status(400).json({message: 'email ou mot de passe invalide'});

        //check if user's email has been verified
        if(user.active === false) return res.status(401).json({message: 'Veuillez valider votre adresse mail'});       
    
        //JWT
        const payload = {id: user._id};
        const token = jwt.sign(payload, process.env.JWTPRIVATEKEY, { expiresIn: '10m' });
    
        res.json({name: user.name, token});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'erreur serveur'});
    }
}

exports.confirmEmail = async (req, res) => {
    try {
        const token = req.params.token;
        if(!token) return res.status(401).json({message: 'Accès refusé'});

        let userId;
        try {
            const { id } = jwt.verify(token, process.env.JWTPRIVATEKEY);
            userId = id;
        } catch (error) {
            console.log(error);
            return res.status(401).json({message: 'token invalide'});
        }

        const user = await User.findByIdAndUpdate(userId, {active: true});

        if(!user) return res.status(404).json({message: 'la ressource demandée n\'existe pas'});

        const REDIRECT_URL = process.env.NODE_ENV === 'production' ? 'https://avelhatonn.herokuapp.com/' : 'http://localhost:3000/';
        res.redirect(REDIRECT_URL + 'emailConfirm');
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'erreur serveur'});
    }
}