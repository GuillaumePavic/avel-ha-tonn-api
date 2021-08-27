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

        //Check password
        const match = await bcrypt.compare(loginData.password, user.password);
        if(!match) return res.status(400).json({message: 'email ou mot de passe invalide'});
    
        //JWT
        const payload = {id: user.id};
        const token = jwt.sign(payload, process.env.JWTPRIVATEKEY, { expiresIn: '1h' });
    
        res.json({name: user.name, token});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'erreur serveur'});
    }
}
