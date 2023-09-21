const jwt = require('jsonwebtoken');

module.exports = (req,res,next)=> {
    try { 
        const token =req.headers.authorization.split(" ")[1]
        jwt.verify(token,'ThisWillBeTheStringWeUseForAuthentication')
        next();
      }
    catch (err) {
        res.status(403).json({message:'Invalid token'})
    }
};    
