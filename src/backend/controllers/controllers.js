const express = require('express');
const { AsyncLocalStorage, AsyncResource } = require('node:async_hooks');
const events = require('node:events');
const { EventEmitter } = events;
const jwt = require('jsonwebtoken');
const router = express.Router();


const emitter = new EventEmitter();
const userStorage = new AsyncLocalStorage();
let Users = [
    { email: "admin@example.com", password: "keleman4xst" },
];

// Reusable function passed as a callback to log the store state
function captureID(msg) {
    const id = userStorage.getStore();
    if (id !== undefined) {
        console.log(`Message: ${msg}, Captured ID: ${id}`);
    } else {
        console.log(`Message: ${msg}, No Context ID found`);
    }
}




let id = 0;

// Event listener to log storage updates
emitter.on('registered', () => {
    console.log('User has been added to the store');
});



// Controller function to return greetings based on the time of day
function getGreetings(req, res) {
    const dayShift = new Date().getHours();
    let greet = "";

    if (dayShift < 12) {
        greet = "Good morning";
    } else if (dayShift >= 12 && dayShift <= 15) {
        greet = "Good afternoon";
    } else {
        greet = "Good evening";
    }

    console.log(`Time of day: ${dayShift} ${req.user}`);
    res.json({ message: `${greet} + ${req.user}` });
}

// Controller function to register a new user
function registerUser(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Invalid Credentials" });
    }

    const user = Users.find((user) => user.email === email);

    if (user) {
        return res.status(400).json({ error: "User already exists" });
    }

   
    const registeredUser = { email, password };
    Users.push(registeredUser);
    userStorage.run(id++, () => {
        emitter.emit('update');
        //next();
    });
    id++;
    // console.log(req.user)
    // req.user = registeredUser;
    // Set the jwt token and append it to the cookie and Log the state and process the user
    const token = jwt.sign({registerUser}, process.env.JWT_SECRET, { expiresIn: 60 });
    res.cookie('kus', token, {maxAge: 60000, httpOnly: true, SameSite: 'None', Secure: true})
    captureID(`Registering user with email: ${email}, ${id}`);
    res.status(200).json({ message: "User saved", token});
}

//Controller to check the presence of the valid current user cookie and token
function validToken(req, res){
    try{
        if (!req.cookies.kus){
            return res.status(400).json({ isValid: false, error: 'Token Expired. Please Log in.'})
        }
        return res.status(200).json({isValid: true, success: 'Token valid. Please continue'})
    }
    catch(err){
        return res.status(500).json({error: 'Unable to validate token'})
    }
}

function login(req, res) {
    const { email, password } = req.body;
try{
    if (!email || !password) {
        return res.status(400).json({error: "Invalid entries"});
    }
    const selectedUser = Users.find(user => user.email === email);

    if (selectedUser) {
        const token = jwt.sign({selectedUser}, process.env.JWT_SECRET, { expiresIn: 60 });
        res.cookie('kus', token, {maxAge: 60000, httpOnly: true, SameSite: 'None', Secure: true})
        return res.status(200).json({message: "User successfully logged in!"})
    }else{
        return res.status(400).json({message: "No user found"})
    }
    
}
catch (err) {
    res.status(500).json({error: "Server Error: " + err.message})
}
   
     
}

function logout(req, res) {
    
        try{
           
                res.clearCookie('kus', {
                    path:'/',
                    SameSite: 'None',
                    Secure: true,
                    httpOnly: true,
                    maxAge:0
                })
                // Respond with a success message or redirect
                return res.status(200).json({ success: 'Logged out successfully', path: "/auth/login-user" });
                
        }
            catch(err){
                // Respond with a success message or redirect
                return res.status(500).json({ error: 'Failed to Logout' });
            }
}

// Export the controllers
module.exports = { getGreetings, registerUser, validToken, logout, login};
