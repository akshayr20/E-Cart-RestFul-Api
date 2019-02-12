const express = require('express');

const app = express();

app.use((req, res, next) => {
	next();
});

const productsRoute = require('./api/routes/products');
const ordersRoute = require('./api/routes/products');

app.use('/products', productsRoute);
app.use('/orders', ordersRoute);

module.exports = app;
