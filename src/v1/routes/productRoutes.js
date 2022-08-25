const express = require('express');
const router = new express.Router();
const productController = require('../controllers/productController');
const checkAuth = require('../authentication/checkAuth');

router.get('/', productController.getAllProducts);
router.post('/', checkAuth, productController.createProduct);
router.get('/:productId', productController.getProductById);
router.patch('/:productId', checkAuth, productController.updateProductById);
router.delete('/:productId', checkAuth, productController.deleteProductById);

module.exports = router;
