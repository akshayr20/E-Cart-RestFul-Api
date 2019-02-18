const Product = require('./product.model');
const mongoose = require('mongoose');

module.exports.getAllProducts = async (req, res) => {
	try {
		const products = await Product.find().select('name price _id productImage');
		if (!products.length) {
			return res.status(404).json({ errorMessage: 'NO_PRODUCT_FOUND' });
		}
		const response = {
			count: products.length,
			products: products.map(product => {
				return {
					id: product._id,
					name: product.name,
					price: product.price,
					productImage: product.productImage,
					request: {
						type: 'GET',
						description: 'PRODUCT_INFO',
						url: `http://localhost:3000/products/${product._id}`
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
		const product = await Product.findById(id).select('name price productImage');
		if (!product) {
			return res.status(404).json({ errorMessage: 'NO_PRODUCT_FOUND' });
		}
		const response = {
			id: product._id,
			name: product.name,
			price: product.price,
			productImage: product.productImage,
			request: {
				type: 'GET',
				description: 'GET_ALL_PRODUCTS',
				url: `http://localhost:3000/products`
			}
		};
		res.status(200).json(response);
	} catch (error) {
		res.status(500).json({ error });
	}
};

module.exports.createProduct = async (req, res) => {
	try {
		console.log(req.body);
		const product = new Product({
			_id: new mongoose.Types.ObjectId(),
			name: req.body.name,
			price: req.body.price,
			productImage: req.file.path
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
