const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = async (req, res) => {
    try {
        const loginData = req.body;
        //JOI
    
        //Check mail
        const user = await User.findOne({mail: loginData.mail});
        if(!user) return res.status(400).json({message: 'email ou mot de passe invalide'});
    console.log(user)
        //Check password
        const match = await bcrypt.compare(loginData.password, user.password);
        if(!match) return res.status(400).json({message: 'email ou mot de passe invalide'});
    
        //JWT
        const payload = {id: user.id};
        const token = jwt.sign(payload, process.env.JWTPRIVATEKEY, { expiresIn: '1h' });
    
        res.cookie('auth', token, { maxAge: 900000, httpOnly: true });
        res.json({name: user.name});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'error server'});
    }
}
