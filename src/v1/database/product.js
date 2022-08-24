const Product = require('./models/productModel');

const createProduct = (productData) => {
    const newProduct = new Product(productData);
    return newProduct.save();
};

const getProductById = async (productId) => {
    const product = await Product.findById(productId).exec();
    return product;
};

const getAllProducts = async () => {
    const products = await Product.find().exec();
    return products;
};

const deleteProductById = async (productId) => {
    const deletedProduct = await Product.findByIdAndDelete(productId).exec();
    return deletedProduct;
};

const updateProductById = async (productId, updateParams) => {
    const updatedProduct = await Product.findByIdAndUpdate(
        {_id: productId}, {$set: updateParams}, {new: true}).exec();
    return updatedProduct;
};

module.exports = {
    createProduct,
    getProductById,
    getAllProducts,
    deleteProductById,
    updateProductById,
};
