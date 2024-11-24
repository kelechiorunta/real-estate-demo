const { googleLogin, githubLogin } = require('../controllers/oauthController');
const express = require('express');

const route = express.Router();

route.post('/google', googleLogin);
route.post('/github', githubLogin);

module.exports = route