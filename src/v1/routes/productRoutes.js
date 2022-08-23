const express = require('express');
const router = new express.Router();

const productController = require('../controllers/productController');

router.get('/', productController.getAllProducts);
router.post('/', productController.createProduct);
router.get('/:productId', productController.getProductById);
router.patch('/:productId', productController.updateProductById);
router.delete('/:productId', productController.deleteProductById);

module.exports = router;
