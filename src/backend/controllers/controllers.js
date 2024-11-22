const express = require('express');
const { AsyncLocalStorage, AsyncResource } = require('node:async_hooks');
const events = require('node:events');
const { EventEmitter } = events;
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const User = require('../models/User');


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

    console.log(`Time of day: ${dayShift} ${req.user.email}`);
    res.json({ message: `${greet} + ${req.user.email}` });
}

// Controller function to register a new user
async function registerUser(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Invalid Credentials" });
    }

    const user = await User.findOne({email});//Users.find((user) => user.email === email);

    if (user) {
        return res.status(400).json({ error: "User already exists" });
    }

    const registeredUser = { email, password, username:email.toString() };
    Users.push(registeredUser);
    userStorage.run(id++, () => {
        emitter.emit('update');
        //next();
    });
    id++;
    // console.log(req.user)
    // req.user = registeredUser;
    // Set the jwt token and append it to the cookie and Log the state and process the user
    const token = jwt.sign({registeredUser}, process.env.JWT_SECRET, { expiresIn: 60 });
    res.cookie('kus', token, {maxAge: 60000, httpOnly: true, SameSite: 'None', Secure: true})
    const newUser = new User({email, password, username:email.toString(), otp: token});
    req.user = newUser;
    await newUser.save();
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

//Controller to login user with email and password
async function login(req, res) {
    const { email, password } = req.body;
try{
    if (!email || !password) {
        return res.status(400).json({error: "Invalid entries"});
    }
    const selectedUser = await User.findOne({email: email})//Users.find(user => user.email === email);
        if (!selectedUser) return res.status(400).json({error: "No such user"});
    const isValidPassword = await selectedUser.comparePassword(password);
        if (!isValidPassword) return res.status(400).json({error: "Incorrect password"});

    if (selectedUser) {
        const token = jwt.sign({selectedUser}, process.env.JWT_SECRET, { expiresIn: 60 });
        res.cookie('kus', token, {maxAge: 60000, httpOnly: true, SameSite: 'None', Secure: true})
        // req.user = selectedUser;
        return res.status(200).json({message: "User successfully logged in!"})
    }else{
        return res.status(400).json({message: "No user found"})
    }
    
}
catch (err) {
    res.status(500).json({error: "Server Error: " + err.message})
}     
}

//Controller to logout user
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

//Controller to handle forgot password instructions
async function forgotPassword(req, res) {
    const { email } = req.body;

    const user = await User.findOne({email});
    if (!user) {
        return res.status(400).json({error: "User does not exist."})
    }
    //Create reset token that expires in 10 minutes
    const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn: '10m'});
    const resetLink = `http://localhost:5501/reset-password/${token}`
    
    // Nodemailer transport setup
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER, // Should be your email address
            pass: process.env.EMAIL_PASS, // App-specific password
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,  // Sender's email
        to: email,                     // Receiver's email
        subject: "Reset Password",
        html: 
            `<p>Hello,</p>
                <p>We received a request to reset your password.</p>
                <p>Click <a href=${resetLink}>here</a> to reset your password. This link will expire in 10 minutes.</p>
                <p>If you did not request a password reset, please ignore this email or contact support if you have any concerns.</p>
                <p>Thank you,<br>Support Team</p>
                `,
    };

    try {
        await transporter.sendMail(mailOptions);
        return res.status(200).json({ message: 'Password reset email sent. Kindly check your email.' })
      } catch (error) {
        console.error('Error sending email:', error);
        return res.status(400).json({ error: 'Error sending email' })
      }

}

//Controller to handle resetting of the password
async function resetPassword(req, res) {
    console.log(req.body)
    const { token, password } = req.body;

  if (!token || !password) {
    return res.status(400).json({ message: 'Token and password are required' });
  }
  
  try {
    // Decode the token to find the user
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);

    // Find the user by ID
    const user = await User.findById(decoded.userId);
    if (!user) {
      return  res.status(400).json({ message: 'User not found'});
    }

    // Update the user's password (make sure to hash it)
    user.password = password; // You should hash this in the model's pre-save hook
    await user.save();

    return  res.status(200).json({ message: 'Password reset successful'})
  } catch (error) {
    console.error(error);
    return  res.status(400).json({ message: 'Invalid or Expired Token'})
  }
}

// Export the controllers
module.exports = { getGreetings, registerUser, validToken, logout, login, forgotPassword, resetPassword};
