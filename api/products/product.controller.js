const Product = require('./product.model');
const mongoose = require('mongoose');

module.exports.getAllProducts = async (req, res) => {
	try {
		const product = await Product.find();
		res.status(200).json(product);
	} catch (error) {
		res.status(500).json(error);
	}
};

module.exports.getProductById = async (req, res) => {
	try {
		const id = req.params.id;
		const product = await Product.findById(id);
		if (product) {
			res.status(200).json(product);
		} else {
			res.status(404).json({ errorMessage: 'No Products found from the given Id' });
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
		res.status(200).json(result);
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
		const result = await Product.update({ _id: id }, updatedProduct);
		res.status(200).json(result);
	} catch (error) {
		res.status(500).json(error);
	}
};

module.exports.deleteProductById = async (req, res) => {
	try {
		const id = req.params.id;
		const product = await Product.remove({ _id: id });
		res.status(200).json(product);
	} catch (error) {
		res.status(500).json(error);
	}
};
