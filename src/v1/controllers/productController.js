const productService = require('../services/productService');
const {validate, validateUpdate} = require('./productValidator');

// Using async/await
const getAllProducts = async (req, res, next) => {
    let products = null;
    try {
        products = await productService.getAllProducts();
        if (products) {
            res.status(200).json({
                'status': 'success',
                'products': products,
            });
        } else {
            const e = new Error('Product not found');
            e.status = 404;
            return next(e);
        }
    } catch (error) {
        const e = new Error('Cannot get all products');
        return next(e);
    }
};

const getProductById = async (req, res, next) => {
    const id = req.params.productId;
    let product = null;
    try {
        product = await productService.getProductById(id);
        if (product) {
            res.status(200).json({
                'status': 'success',
                'product': product,
            });
        } else {
            const e = new Error('Product not found');
            e.status = 404;
            return next(e);
        }
    } catch (error) {
        const e = new Error('Cannot get product');
        return next(e);
    }
};

const deleteProductById = async (req, res, next) => {
    const id = req.params.productId;
    let deletedProduct = null;
    try {
        deletedProduct = await productService.deleteProductById(id);
        if (deletedProduct) {
            res.status(200).json({
                'status': 'success',
                'product': deletedProduct,
            });
        } else {
            const e = new Error('Product not found');
            e.status = 404;
            return next(e);
        }
    } catch (error) {
        const e = new Error('Cannot delete product');
        return next(e);
    }
};


const updateProductById = async (req, res, next) => {
    const id = req.params.productId;
    let updateParams = null;
    try {
        updateParams = await validateUpdate(req.body);
    } catch (err) {
        const e = new Error('Product data is not valid');
        e.status = 400;
        return next(e);
    }

    let updatedProduct = null;
    try {
        updatedProduct = await productService.updateProductById(id, updateParams);
        if (updatedProduct) {
            res.status(200).json({
                'status': 'success',
                'product': updatedProduct,
            });
        } else {
            const e = new Error('Product not found');
            e.status = 404;
            return next(e);
        }
    } catch (error) {
        console.log(error);
        const e = new Error('Cannot update product');
        return next(e);
    }
};

// Using pure promises
const createProduct = (req, res, next) => {
    const productData = {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        quantity: req.body.quantity,
    };

    validate(productData).then((valid) => {
        productService.createProduct(productData).then((product) => {
            res.status(200).json({
                'message': 'Product created successfully',
                'product': product,
            });
        }).catch((error) => {
            const e = new Error('Product created failed');
            e.status = 400;
            return next(e);
        });
    }).catch((error) => {
        const e = new Error('Product data is not valid');
        e.status = 400;
        return next(e);
    });
};

module.exports = {
    getAllProducts,
    getProductById,
    deleteProductById,
    updateProductById,
    createProduct,
};
