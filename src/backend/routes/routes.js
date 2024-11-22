const express = require('express');
const { getGreetings, registerUser, validToken, login, logout, forgotPassword, resetPassword } = require('../controllers/controllers')
const { checkToken } = require('../middleware')

const route = express.Router();

//Protect or authenticate all get routes in this router
//by authenticating with the checkToken function.
route.use((req, res, next)=>{
    console.log(req.user);
    next();
})

//Sampling purpose: the getgreetings controller function
//can only be authenticated by the checkToken middleware 
//function passed to all get routes mounted on this router.
route.get('/', checkToken, getGreetings); 
route.get('/authenticate', validToken); 
route.get('/logout', logout); 
route.post('/login', login); 
route.post('/forgot-password', forgotPassword); 
route.post('/reset-password', resetPassword); 
route.post('/', registerUser);

///Protected routes


module.exports = route;