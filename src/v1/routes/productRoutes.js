const express = require('express');
const router = new express.Router();

const productController = require('../controllers/productController');

router.get('/', productController.getAllProducts);

module.exports = router;
