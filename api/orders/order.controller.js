const Order = require('./order.model');
const mongoose = require('mongoose');

module.exports.getAllOrders = async (req, res) => {
	try {
		const Orders = await Order.find();
		res.status(200).json(Orders);
	} catch (error) {
		res.status(500).json(error);
	}
};

module.exports.getOrderById = async (req, res) => {
	try {
		const id = req.params.id;
		const order = await Order.findById(id);
		if (order) {
			res.status(200).json(order);
		} else {
			res.status(404).json({ errorMessage: 'No Order found from the given Id' });
		}
	} catch (error) {
		res.status(500).json({ error });
	}
};

module.exports.createOrder = async (req, res) => {
	try {
		const order = new Order({
			_id: new mongoose.Types.ObjectId(),
			product: req.body.product,
			quantity: req.body.quantity
		});
		const result = await order.save();
		res.status(200).json(result);
	} catch (error) {
		res.status(500).json(error);
	}
};

module.exports.updateOrderById = async (req, res) => {
	try {
		const id = req.params.id;
		const updatedOrder = {
			$set: {
				quantity: req.body.quantity
			}
		};
		const result = await Order.update({ _id: id }, updatedOrder);
		res.status(200).json(result);
	} catch (error) {
		res.status(500).json(error);
	}
};

module.exports.deleteOrderById = async (req, res) => {
	try {
		const id = req.params.id;
		const order = await Order.remove({ _id: id });
		res.status(200).json(order);
	} catch (error) {
		res.status(500).json(error);
	}
};
