// eslint-disable-next-line no-unused-vars
const getAllProducts = (req, res) => {
    res.status(200).json({
        'message': 'All products fetched',
    });
};

const getProductById = (req, res) => {
    const id = req.params.productId;
    res.status(200).json({
        'message': 'Product with ID ' + id + ' fetched',
    });
};

const deleteProductById = (req, res) => {
    const id = req.params.productId;
    res.status(200).json({
        'message': 'Product with ID ' + id + ' deleted',
    });
};

const updateProductById = (req, res) => {
    const id = req.params.productId;
    res.status(200).json({
        'message': 'Product with ID ' + id + ' updated',
    });
};

const createProduct = (req, res) => {
    res.status(200).json({
        'message': 'Product created',
    });
};

module.exports = {
    getAllProducts,
    getProductById,
    deleteProductById,
    updateProductById,
    createProduct,
};
