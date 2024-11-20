const express = require('express');
const productController = require('../controllers/productsController');
const router = express.Router();

// GET all products
router.get('/', productController.getAllProducts);

// POST a new product
router.post('/', productController.createProduct);

// PATCH to update an existing product
router.patch('/:id', productController.updateProduct);

// DELETE a product
router.delete('/:id', productController.deleteProduct);

module.exports = router;
