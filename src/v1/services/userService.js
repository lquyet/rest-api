const mongoose = require('mongoose');
const User = require('../database/user');
const bcrypt = require('bcrypt');

const createUser = async (userData) => {
    // send email, if verified, create user
    return new Promise((resolve, reject) => {
        bcrypt.hash(userData.password, 10, function(err, hash) {
            if (err) {
                reject(new Error('Error hashing password'));
            } else {
                userData.password = hash;
                userData['_id'] = new mongoose.Types.ObjectId();
                User.createUser(userData).then((result) => resolve(result));
            }
        });
    });
};

const verifyUser = async (userData) => {
    return;
};

module.exports = {
    createUser,
    verifyUser,
};
