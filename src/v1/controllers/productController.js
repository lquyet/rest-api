// eslint-disable-next-line no-unused-vars
const getAllProducts = (req, res) => {
    res.status(200).json({
        'message': 'All products fetched',
    });
};

module.exports = {
    getAllProducts,
};
