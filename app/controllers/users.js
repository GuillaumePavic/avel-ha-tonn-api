const User = require('../models/userModel');
const bcrypt = require('bcrypt');

exports.createUser = async (req, res) => {
    try {
        const userData = req.body;
        console.log(userData);
        //JOI
    
        //USER MODEL
        const newUser = new User(userData);
        const salt = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(newUser.password, salt);
        await newUser.save();
    
        //RES ok
        res.json({message: 'success'});
    } catch (error) {
        console.log(error);
    }
}