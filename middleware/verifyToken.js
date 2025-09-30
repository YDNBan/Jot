const jwt = require('jsonwebtoken')

exports.verifyToken = (req, res, next)=> {
    const token  = req.headers.authorization;
    if (!token)
        {
        return res.status(401).json({message: "You are not logged in"})
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        return next();
    } catch(err) {
        return res.status(401).json({ message: "Invalid Token"});
    }
}