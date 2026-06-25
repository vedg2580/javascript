const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader) return res.status(401).json({"message": "No Token Provided"});

    try {
        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(token, "THIS_SECRET_KEY_WILL_BE_IN_ENV_VARIABLES_IN_PRODUCTION_CODE");

        req.user = decoded;
        next();
    } catch(error){
        return res.status(401).json({"message": "Invalid Token"});
    }
};

module.exports = auth;