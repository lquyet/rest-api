const productService = require('../services/productService');
const validate = require('./productValidator');

const getAllProducts = (req, res, next) => {
    res.send('Get all products');
};

const getProductById = (req, res, next) => {
    const id = req.params.productId;
    res.status(200).json({
        'message': 'Product with ID ' + id + ' fetched',
    });
};

const deleteProductById = (req, res, next) => {
    const id = req.params.productId;
    res.status(200).json({
        'message': 'Product with ID ' + id + ' deleted',
    });
};

const updateProductById = (req, res, next) => {
    const id = req.params.productId;
    res.status(200).json({
        'message': 'Product with ID ' + id + ' updated',
    });
};

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
            next(e);
        });
    }).catch((error) => {
        const e = new Error('Product data is not valid');
        e.status = 400;
        next(e);
    });
};

module.exports = {
    getAllProducts,
    getProductById,
    deleteProductById,
    updateProductById,
    createProduct,
};
