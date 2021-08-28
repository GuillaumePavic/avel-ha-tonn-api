const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        //verify if a token is provided
        const token = req.headers.auth;
        if(!token) return res.status(401).json({message: 'Accès refusé'});

        //verify if the token is valid
        const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY);
        req.user = decoded; 

        next();
    } catch (error) {
        res.status(401).json({ message: 'token invalide' });
    }
}