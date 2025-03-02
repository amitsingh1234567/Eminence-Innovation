const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
    try{
        let token = req.headers['authorization'];
        if (!token){    
            res.status(401).json({msg: 'Unauthorized'});
        };
        token = req.headers.authorization.split(' ')[1];
        req.user = jwt.verify(token, process.env.JWT_SECRET);
        next(); 
    }catch(err){
        res.status(401).json({msg: 'Unauthorized'});
    };
};

module.exports = {
    verifyToken
};
