const jwt = require('jsonwebtoken');

const createToken = async (data) => {
    return new Promise((resolve, reject) => {
        jwt.sign(data, process.env.JWT_SECRET, {expiresIn: process.env.JWT_TOKEN_EXPIRE}, (err, token) => {
            if (err) {
                console.log(err);
                reject(new Error('Error creating token'));
            } else {
                resolve(token);
            }
        });
    });
};

module.exports = {
    createToken,
};
