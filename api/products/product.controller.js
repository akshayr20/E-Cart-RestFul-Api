const Product = require('./product.model');
const mongoose = require('mongoose');

module.exports.getAllProducts = async (req, res) => {
	try {
		const product = await Product.find().select('name price _id');
		const response = {
			count: product.length,
			products: product.map(doc => {
				return {
					id: doc._id,
					name: doc.name,
					price: doc.price,
					request: {
						type: 'GET',
						description: 'PRODUCT_INFO',
						url: `http://localhost:3000/products/${doc._id}`
					}
				};
			})
		};
		res.status(200).json(response);
	} catch (error) {
		res.status(500).json(error);
	}
};

module.exports.getProductById = async (req, res) => {
	try {
		const id = req.params.id;
		const product = await Product.findById(id).select('name price');
		const response = {
			product,
			request: {
				type: 'GET',
				description: 'GET_ALL_PRODUCTS',
				url: `http://localhost:3000/products`
			}
		};
		if (product) {
			res.status(200).json(response);
		} else {
			res.status(404).json({ errorMessage: 'NO_PRODUCT_FOUND' });
		}
	} catch (error) {
		res.status(500).json({ error });
	}
};

module.exports.createProduct = async (req, res) => {
	try {
		const product = new Product({
			_id: new mongoose.Types.ObjectId(),
			name: req.body.name,
			price: req.body.price
		});
		const result = await product.save();
		const response = {
			message: 'PRODUCT_CREATED',
			request: {
				type: 'GET',
				description: 'GET_PRODUCT_INFO',
				url: `http://localhost:3000/products/${result._id}`
			}
		};
		res.status(200).json(response);
	} catch (error) {
		res.status(500).json(error);
	}
};

module.exports.updateProductById = async (req, res) => {
	try {
		const id = req.params.id;
		const updatedProduct = {
			$set: req.body
		};
		await Product.update({ _id: id }, updatedProduct);
		const response = {
			message: 'PRODUCT_UPDATED',
			request: {
				type: 'GET',
				description: 'GET_PRODUCT_INFO',
				url: `http://localhost:3000/products/${id}`
			}
		};
		res.status(200).json(response);
	} catch (error) {
		res.status(500).json(error);
	}
};

module.exports.deleteProductById = async (req, res) => {
	try {
		const id = req.params.id;
		await Product.remove({ _id: id });
		const response = {
			message: 'PRODUCT_DELETED',
			request: {
				type: 'GET',
				description: 'GET_ALL_PRODUCTS',
				url: `http://localhost:3000/products`
			}
		};
		res.status(200).json(response);
	} catch (error) {
		res.status(500).json(error);
	}
};
