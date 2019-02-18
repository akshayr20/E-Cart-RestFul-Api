const express = require('express');

const router = express.Router();

const { signUp } = require('./user.controller');

router.post('/signup', signUp);

module.exports = router;
