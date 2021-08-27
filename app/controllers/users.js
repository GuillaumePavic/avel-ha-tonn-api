const User = require('../models/userModel');
const bcrypt = require('bcrypt');

exports.createUser = async (req, res) => {
    try {
        const userData = req.body;

        //JOI
    
        //save user
        const newUser = new User(userData);

        const salt = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(newUser.password, salt);

        await newUser.save();
    
        //res
        res.json({message: 'success'});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'erreur serveur'});
    }
}

exports.getUser = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select(['name', 'mail', 'createdAt', 'markers','-_id']);

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