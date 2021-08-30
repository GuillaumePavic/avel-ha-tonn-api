const User = require('../models/userModel');
const userValidation = require('../validation/user');
const sendVerificationEmail = require('../utils/sendVerificationEmail');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.createUser = async (req, res) => {
    try {
        const userData = req.body;

        //JOI
        try {
            await userValidation.validateAsync(userData);
        } catch (error) {
            return res.status(400).send({message: error.details[0].message}); 
        }

        //check if email is not already used
        const emailAlreadyUsed = await User.findOne({email: userData.email});
        if(emailAlreadyUsed) return res.status(409).json({message: 'cet email est déjà utilisé'});

        //save user
        const newUser = new User(userData);

        const salt = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(newUser.password, salt);

        await newUser.save();

        //email verification
        const payload = {id: newUser._id};
        const token = jwt.sign(payload, process.env.JWTPRIVATEKEY, { expiresIn: '10m' });
        await sendVerificationEmail(newUser.email ,token);
    
        //res
        res.json({message: 'Veuillez vérifier vos emails afin de finaliser la création de votre compte'});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'erreur serveur'});
    }
}

exports.getUser = async (req, res) => {
    try {
        const userId = req.user.id;

        const user = await User.findById(userId).select(['name', 'email', 'createdAt', 'markers','-_id']);

        if(!user) return res.status(404).json({message: 'la ressource demandée n\'existe pas'});

        res.json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'erreur serveur'});
    }
}

exports.saveMarker = async (req, res) => {
    try {
        const newMarker = req.body;

        const userId = req.user.id;

        const user = await User.findByIdAndUpdate(userId, { $push: { markers: newMarker } })
        if(!user) return res.status(404).json({message: 'la ressource demandée n\'existe pas'});
        
        res.json({message: 'marker sauvegardé'});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'erreur serveur'});
    }
}

exports.updateUser = async (req, res) => {
    try {
        const userId = req.user.id;
        const data = req.body;

        //JOI

        //verify if user exists
        const user = await User.findById(userId).lean();
        if(!user) return res.status(404).json({message: 'la ressource demandée n\'existe pas'});
        
        //password
        if(data.password) {
            //first verify old password
            const validPassword = bcrypt.compareSync(data.password, user.password);
        }
        //name
        //email
        if(data.email) {
            const user = await User.findOne({email: data.email});
            if(user) return res.status(409).json({message: 'cet email est déjà utilisé'});
        }

        //markers    
        

        const updatedUser = {
            ...user,
            ...req.body
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'erreur serveur'});
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const userId = req.user.id;

        await User.findByIdAndDelete(userId);

        res.json({message: 'le compte a été supprimé'});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'erreur serveur'});
    }
}