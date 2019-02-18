require('./config/config');

const express = require('express');

const app = express();

const morgan = require('morgan');

const bodyParser = require('body-parser');

const mongoose = require('./db/mongoose');

app.use(morgan('dev'));

app.use('/uploads', express.static('uploads'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
	if (req.method === 'OPTIONS') {
		res.header('Access-Control-Allow-Method', 'PUT,  POST, PATCH, DELETE, GET');
		return res.status(200).json({});
	}
	next();
});

const productsRoute = require('./api/products');
const ordersRoute = require('./api/orders');
const usersRoute = require('./api/users');

app.use('/products', productsRoute);
app.use('/orders', ordersRoute);
app.use('/user', usersRoute);

app.use((req, res, next) => {
	const error = new Error('Not Found');
	error.status = 404;
	next(error);
});

app.use((error, req, res, next) => {
	res.status(error.status || 500);
	res.json({
		errors: {
			message: error.message
		}
	});
});

module.exports = app;
