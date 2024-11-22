const axios = require('axios');
const jwt = require('jsonwebtoken');

const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '60m',
    });
};
// Create and send Cookie ->
const createSendToken = (user, statusCode, req, res) => {
    const token = signToken(user);

    // console.log(process.env.JWT_COOKIE_EXPIRES_IN);
    const cookieOptions = {
        // expires: new Date(Date.now() + 60 * 1000), // Adds 60 seconds to the current time
        maxAge: 20000,
        httpOnly: true,
        path: '/',
        secure: true,
        sameSite: 'None'
    };
    
    if (process.env.NODE_ENV === 'production') {
        cookieOptions.secure = true;
        cookieOptions.sameSite = 'None';
    }

    res.cookie('kus', token, cookieOptions);

    // req.user = user;
    
    res.status(statusCode).json({
        message: 'success',
        token,
        user
    });
};

async function googleLogin(req, res) {
  const { code } = req.body;
  const client_id = process.env.GOOGLE_ID;
  const client_secret = process.env.GOOGLE_SECRET;
  const redirect_uri = process.env.REDIRECT_URI; // The redirect URI used during Google login
  const grant_type = 'authorization_code';

  const tokenRequestData = new URLSearchParams({
    code,
    client_id,
    client_secret,
    redirect_uri,
    grant_type,
  });

  try {
    // Step 1: Exchange the code for tokens
    const tokenResponse = await axios.post(
      'https://oauth2.googleapis.com/token',
      tokenRequestData.toString(),
      {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    const { access_token, id_token } = tokenResponse.data;

    // Step 2: Retrieve user info using the access token
    const userInfoResponse = await axios.get(
      'https://www.googleapis.com/oauth2/v1/userinfo',
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    const userInfo = userInfoResponse.data;

    console.log('User Info:', userInfo);

    // Step 3: Optionally, create a custom JWT or handle user data in your database
    // Example: Attach user info to a JWT and send it back to the client
    createSendToken(userInfo, 200, req, res); // Replace this with your implementation

  } catch (err) {
    console.error('Google login error:', err.response?.data || err.message);
    res.status(500).json({ error: 'Failed to log in with Google' });
  }
}


module.exports = { googleLogin };