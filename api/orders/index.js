const express = require('express');

const router = express.Router();

const { getAllOrders, getOrderById, createOrder, updateOrderById, deleteOrderById } = require('./order.controller');

router.get('/', getAllOrders);

router.get('/:id', getOrderById);

router.post('/', createOrder);

router.patch('/:id', updateOrderById);

router.delete('/:id', deleteOrderById);

module.exports = router;
