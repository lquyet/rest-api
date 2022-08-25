const jwt = require('jsonwebtoken');

const checkAuth = (req, res, next) => {
    try {
        // Bearer Token Authentication
        const token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, process.env.JWT_SECRET);
        return next();
    } catch (error) {
        const e = new Error('Invalid token');
        e.status = 401;
        return next(e);
    }
};

module.exports = checkAuth;
