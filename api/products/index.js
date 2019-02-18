const express = require('express');

const router = express.Router();

const { getProductById, getAllProducts, createProduct, updateProductById, deleteProductById } = require('./product.controller');

router.get('/', getAllProducts);

router.get('/:id', getProductById);

router.post('/', createProduct);

router.patch('/:id', updateProductById);

router.delete('/:id', deleteProductById);


module.exports = router;
