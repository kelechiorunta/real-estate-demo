const jwt = require('jsonwebtoken');
const User = require('./models/User');

function checkToken(req, res, next){

    const secretKey = process.env.JWT_SECRET;

    if (!secretKey){
        return res.status(401).json({error: "No secret key"})
    }

    // Check if token exists
    if (!req.cookies.kus) {
         return res.status(401).json({ error: 'Unauthorized: No token provided. Please sign up or log in..' });
    }
    
    try {
        // Verify the token
        jwt.verify(req.cookies.kus, process.env.JWT_SECRET, async(err, user) => {
            if (err) {
                return res.status(403).json({ error: 'Invalid or Expired Token' }); // If token is invalid or expired
              }
            const activeUser = user?.id || user?.selectedUser || user?.registeredUser ;//await User.findOne({email: user?.id?.email});
            let isStored
            //Verify if user is in database
            const storedActiveUser = await User.findOne({email: activeUser.email});
            if (storedActiveUser) {
                req.user = storedActiveUser;
                if (!req.user.picture || req.user.picture===''){
                    req.user.picture = activeUser?.picture;
                    await req.user.save();
                }
                isStored = true
                
            } else {
                req.user = activeUser
                req.user.picture = activeUser?.picture
                isStored = false;
                await req.user.save(); //Save to database if non-existent
            }
            console.log(req.user, isStored);
            next();
        });
        // console.log(decoded);
         // Attach decoded token data to the request
         // Proceed to the next middleware or route handler
    } catch (err) {
        console.error('Token verification error:', err);
        res.status(403).json({ error: 'Forbidden: Invalid token' });
    }
}

module.exports = { checkToken }