const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    description: String,
    price: Number,
    quantity: Number,
});

const productModel = mongoose.model('Product', productSchema);

module.exports = productModel;
