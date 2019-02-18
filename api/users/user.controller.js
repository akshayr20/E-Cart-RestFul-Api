const User = require('./user.model');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

module.exports.signUp = async (req, res) => {
	try {
		const hash = await bcrypt.hash(req.body.password, 10);
		const user = new User({
			_id: new mongoose.Types.ObjectId(),
			email: req.body.email,
			password: hash
		});
		await user.save();
		res.status(201).json({
			message: 'USER_CREATED'
		});
	} catch (error) {
		res.status(500).json(error);
	}
};
