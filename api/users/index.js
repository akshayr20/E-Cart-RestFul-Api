const express = require('express');

const router = express.Router();

const { signUp, removeUser, login } = require('./user.controller');

router.post('/signup', signUp);
router.post('/login', login);
router.delete('/:id', removeUser);

module.exports = router;
