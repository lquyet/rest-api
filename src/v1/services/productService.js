const mongoose = require('mongoose');
const Product = require('../database/product');

const getAllProducts = () => {
    return Product.getAllProducts();
};

const getProductById = async (productId) => {
    return Product.getProductById(productId);
};

const deleteProductById = async (productId) => {
    return Product.deleteProductById(productId);
};

const updateProductById = async (productId, updateParams) => {
    return Product.updateProductById(productId, updateParams);
};

const createProduct = async (productData) => {
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
