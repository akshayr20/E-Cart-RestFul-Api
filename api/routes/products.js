const express = require('express');

const router = express.Router();

const Product = require('../models/product');

const mongoose = require('mongoose');

router.get('/', (req, res, next) => {
	res.status(200).json({ message: 'products get request' });
});

router.get('/:id', (req, res, next) => {
	const id = req.params.id;
	res.status(200).json({ message: `product Id: ${id}` });
});

router.patch('/:id', (req, res, next) => {
	const id = req.params.id;
	res.status(200).json({ message: `product Id: ${id} updated` });
});

router.delete('/:id', (req, res, next) => {
	const id = req.params.id;
	res.status(200).json({ message: `product Id: ${id} deleted` });
});

router.post('/', (req, res, next) => {
	const product = new Product({
		_id: new mongoose.Types.ObjectId(),
		name: req.body.name,
		price: req.body.price
	});
	product.save();
	res.status(201).json({ message: product });
});

module.exports = router;
