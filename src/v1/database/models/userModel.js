const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
});

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;
