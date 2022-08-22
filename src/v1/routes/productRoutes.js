const express = require('express');
const router = new express.Router();

const productController = require('../controllers/productController');

router.get('/', productController.getAllProducts);

router.get('/:productId', productController.getProductById);
router.post('/:productId', productController.createProduct);
router.patch('/:productId', productController.updateProductById);
router.delete('/:productId', productController.deleteProductById);

module.exports = router;
