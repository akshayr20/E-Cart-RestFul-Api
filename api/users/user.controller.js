const User = require('./user.model');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

module.exports.signUp = async (req, res) => {
	try {
		const existingUser = await User.find({ email: req.body.email });
		if (existingUser.length) {
			return res.status(409).json({ message: 'MAIL_EXISTS' });
		}
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

module.exports.login = async (req, res) => {
	try {
		const user = await User.findOne({ email: req.body.email });
		if (!user) {
			return res.status(401).json({ message: 'AUTH_FAILED' });
		}
		bcrypt.compare(req.body.password, user.password, (err, result) => {
			if (err) {
				return res.status(401).json({ message: 'AUTH_FAILED' });
			}
			if (result) {
				const token = jwt.sign(
					{
						email: user.email,
						userId: user._id
					},
					process.env.JWT_SECRET,
					{
						expiresIn: '1h'
					}
				);
				return res.status(200).json({
					message: 'AUTH_SUCCESSFUL',
					token: token
				});
			}
		});
	} catch (error) {
		return res.status(401).json({ message: 'AUTH_FAILED' });
	}
};

module.exports.removeUser = async (req, res) => {
	try {
		const id = req.params.id;
		const result = await User.remove({ _id: id });
		res.status(200).json({ message: 'USER_DELETED' });
	} catch (error) {
		res.status(500).json(error);
	}
};
