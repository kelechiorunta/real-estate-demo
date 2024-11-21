const { googleLogin } = require('../controllers/oauthController');
const express = require('express');

const route = express.Router();

route.post('/google', googleLogin);

module.exports = route