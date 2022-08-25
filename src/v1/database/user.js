const User = require('./models/userModel');

const createUser = async (userData) => {
    const duplicationCheck = await User.findOne({email: userData.email}).exec();
    if (duplicationCheck) {
        return new Promise((resolve) => resolve(null));
    }
    const newUser = new User(userData);
    return newUser.save();
};

const verifyUser = async (userEmail) => {
    const user = await User.findOne({email: userEmail}).exec();
    return user;
};


module.exports = {
    createUser,
    verifyUser,
};
