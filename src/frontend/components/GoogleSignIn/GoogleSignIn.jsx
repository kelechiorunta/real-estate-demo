import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import './GoogleSignIn.css'

export default function GoogleSignIn() {
  const navigate = useNavigate();
  const location = useLocation();
  const redirectPath = location.state?.from || location.state?.path || '/';
  const handleSuccess = async (credentialResponse) => {
    console.log(credentialResponse);
    try{
      const data = { code: credentialResponse.code }
      const res = await axios.post('/api/auth/google', data ,
        {withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
        }
       )
       console.log(res?.data?.user)
       localStorage.setItem("UserData", JSON.stringify(res?.data?.user))
       navigate(redirectPath, {state: res?.data?.user, replace: true})
    }
    catch (err) {
       console.log('Failed Login attempt: ', err?.response?.data?.error || err?.message)
    }
  };

  const handleError = () => {
    console.log('Login Failed');
  };

  const googleLogin = useGoogleLogin({
		onSuccess: handleSuccess,
		onError: handleError,
		flow: "auth-code",
	});


  return (
    <>
    <button className='googleBtn'
			onClick={googleLogin}
		>
       Sign in with Google 🚀
			{/* Sign in with Google */}
		</button>
		</>
  );
}