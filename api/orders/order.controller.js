const Order = require('./order.model');
const Product = require('../products/product.model');
const mongoose = require('mongoose');

module.exports.getAllOrders = async (req, res) => {
	try {
        const orders = await Order.find().select('product quantity _id');
        if (!orders.length) {
			return res.status(404).json({ errorMessage: 'NO_ORDER_FOUND' });
		}
		const response = {
			count: orders.length,
			orders: orders.map(order => {
				return {
					_id: order._id,
					product: order.product,
					quantity: order.quantity,
					request: {
						type: 'GET',
						description: 'PRODUCT_INFO',
						url: `http://localhost:3000/products/${order.product}`
					}
				};
			})
		};
		res.status(200).json(response);
	} catch (error) {
		res.status(500).json(error);
	}
};

module.exports.getOrderById = async (req, res) => {
	try {
		const id = req.params.id;
		const order = await Order.findById(id).select('product quantity _id');
		if (!order) {
			return res.status(404).json({ errorMessage: 'NO_ORDER_FOUND' });
		}
		const response = {
			_id: order._id,
			product: order.product,
			quantity: order.quantity,
			request: {
				type: 'GET',
				description: 'PRODUCT_INFO',
				url: `http://localhost:3000/products/${order.product}`
			}
		};
		res.status(200).json(response);
	} catch (error) {
		res.status(500).json({ error });
	}
};

module.exports.createOrder = async (req, res) => {
	try {
		const product = await Product.findById(req.body.product);
		if (!product) {
			return res.status(500).json({ errorMessage: 'PRODUCT_NOT_FOUND' });
		}
		const order = new Order({
			_id: new mongoose.Types.ObjectId(),
			product: req.body.product,
			quantity: req.body.quantity
		});
		const result = await order.save();
		const response = {
			message: 'ORDER_CREATED',
			request: {
				type: 'GET',
				description: 'ORDER_INFO',
				url: `http://localhost:3000/orders/${result._id}`
			}
		};
		res.status(200).json(response);
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
		const response = {
			message: 'ORDER_UPDATED',
			request: {
				type: 'GET',
				description: 'ORDER_INFO',
				url: `http://localhost:3000/orders/${result._id}`
			}
		};
		res.status(200).json(response);
	} catch (error) {
		res.status(500).json(error);
	}
};

module.exports.deleteOrderById = async (req, res) => {
	try {
		const id = req.params.id;
		const order = await Order.remove({ _id: id });
		const response = {
			message: 'ORDER_DELETED',
			request: {
				type: 'GET',
				description: 'ALL_ORDER',
				url: `http://localhost:3000/orders`
			}
		};
		res.status(200).json(response);
	} catch (error) {
		res.status(500).json(error);
	}
};
