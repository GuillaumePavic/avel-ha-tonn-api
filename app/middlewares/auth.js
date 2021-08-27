const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        //check cookie
        const token = req.headers.auth;
        if(!token) return res.status(401).json({message: 'Accès refusé'});

        //verify token
        const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY);
        req.user = decoded; 
        next();
    } catch (error) {
        res.status(401).json({ message: 'token invalide' });
    }
}