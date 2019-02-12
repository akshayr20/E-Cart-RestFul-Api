const express = require('express');

const app = express();

const morgan = require('morgan');

app.use(morgan('dev'));

const productsRoute = require('./api/routes/products');
const ordersRoute = require('./api/routes/products');

app.use('/products', productsRoute);
app.use('/orders', ordersRoute);

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
