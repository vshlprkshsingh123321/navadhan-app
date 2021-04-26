const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, 'secret_key_for_creating_jwt_token');
        req.userData = {userId: decodedToken.userId};
        next();
    } catch (err) {
        res.status(401).json({
            message: "Authorization failed"
        })
    }
};