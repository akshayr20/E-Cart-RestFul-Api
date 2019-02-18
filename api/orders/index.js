const express = require('express');

const router = express.Router();

// const Order = require('../models/order');

const mongoose = require('mongoose');

// router.get('/', (req, res, next) => {
// 	res.status(200).json({ message: 'Orders were fetched' });
// });

// router.get('/:id', (req, res, next) => {
// 	const id = req.params.id;
// 	res.status(200).json({ message: `Order Id: ${id}` });
// });

// router.patch('/:id', (req, res, next) => {
// 	const id = req.params.id;
// 	res.status(200).json({ message: `Order Id: ${id} updated` });
// });

// router.delete('/:id', (req, res, next) => {
// 	const id = req.params.id;
// 	res.status(200).json({ message: `Order Id: ${id} deleted` });
// });

// router.post('/', (req, res, next) => {
// 	const order = new Order({
// 		_id: new mongoose.Types.ObjectId(),
// 		product: req.body.productId,
// 		quantity: req.body.quantity
// 	});
// 	order.save();
// 	res.status(201).json({ message: order });
// });

module.exports = router;
