const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	product: mongoose.Schema.Types.ObjectId,
	quantity: { type: Number, required: true }
});

module.exports = mongoose.model('Order', orderSchema);
