const mongoose = require('mongoose');
const Product = require('../database/product');

const getAllProducts = (req, res, next) => {
    return;
};

const getProductById = (req, res, next) => {
    return;
};

const deleteProductById = (req, res, next) => {
    return;
};

const updateProductById = (req, res, next) => {
    return;
};

const createProduct = (productData) => {
    productData['_id'] = new mongoose.Types.ObjectId();
    return Product.createProduct(productData);
};

module.exports = {
    getAllProducts,
    getProductById,
    deleteProductById,
    updateProductById,
    createProduct,
};
