const Product = require('./models/productModel');

const createProduct = (productData) => {
    const newProduct = new Product(productData);
    return newProduct.save();
};

module.exports = {
    createProduct,
};
