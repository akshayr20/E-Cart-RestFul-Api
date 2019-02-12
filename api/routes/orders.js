const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
	res.status(200).json({ message: 'Orders were fetched' });
});

router.get('/:id', (req, res, next) => {
	const id = req.params.id;
	res.status(200).json({ message: `Order Id: ${id}` });
});

router.patch('/:id', (req, res, next) => {
	const id = req.params.id;
	res.status(200).json({ message: `Order Id: ${id} updated` });
});

router.delete('/:id', (req, res, next) => {
	const id = req.params.id;
	res.status(200).json({ message: `Order Id: ${id} deleted` });
});

router.post('/', (req, res, next) => {
	res.status(201).json({ message: 'Orders were created' });
});

module.exports = router;
