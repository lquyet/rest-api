const userService = require('../services/userService');
const {validate} = require('./validators/userValidator');
const {createToken} = require('../authentication/jwt');

const createUser = async (req, res, next) => {
    const userData = req.body;
    try {
        await validate(userData);
    } catch (error) {
        const e = new Error('Invalid email or password');
        e.status = 400;
        return next(e);
    }

    try {
        const user = await userService.createUser(userData);
        if (user) {
            res.status(200).json({
                'status': 'success',
            });
        } else {
            const error = new Error('User already exists');
            error.status = 400;
            return next(error);
        }
    } catch (error) {
        const e = new Error('Cannot create user');
        return next(e);
    }
};

const verifyUser = async (req, res, next) => {
    const userData = req.body;

    try {
        await validate(userData);
    } catch (error) {
        const e = new Error('Wrong email or password');
        e.status = 400;
        return next(e);
    }

    try {
        const user = await userService.verifyUser(userData);
        if (user) {
            try {
                const token = await createToken({email: userData.email, id: user._id});
                res.status(200).json({
                    'status': 'success',
                    'token': token,
                });
            } catch (error) {
                console.log(error);
                const e = new Error('Cannot create token');
                return next(e);
            }
        } else {
            const e = new Error('Wrong email or password');
            e.status = 400;
            return next(e);
        }
    } catch (error) {
        const e = new Error('Cannot verify user');
        return next(e);
    }
};

module.exports = {
    createUser,
    verifyUser,
};
