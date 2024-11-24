import React, { useEffect, useTransition, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './GitHubSignIn.css';

export default function GitHubSignIn() {
    const navigate = useNavigate();
    const [isPending, startTransition] = useTransition();
    const [loading, setLoading] = useState(null)
    // const { code } = useParams();
    const githubOAuthURL = `https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_GITHUB_ID}&redirect_uri=${process.env.REACT_APP_GITHUB_REDIRECT}&scope=read:user`;

    // useEffect(() => {
    //     // const queryString = window.location.search;
    //     handleOAuth();
        
    // }, [window.location.search,]);

    // const handleOAuth = () => {
    //     // const githubOAuthURL = `https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_GITHUB_ID}&redirect_uri=${process.env.REACT_APP_GITHUB_REDIRECT}&scope=read:user`;
    //     // window.location.href = githubOAuthURL;
    //     const urlParams = new URLSearchParams(window.location.search);
    //     const code = urlParams.get('code');
    //     if (code) {
    //         // alert("Hello")
    //         setLoading(true)
    //     // Exchange the code for user details
    //         exchangeCodeForToken(code);
    //     }
    // }

    // const exchangeCodeForToken = async (code) => {
    //     setLoading(true)
    //     try {
    //         const res = await axios.post(
    //             `/api/auth/github`,
    //             { code },
    //             { withCredentials: true, headers: { 'Content-Type': 'application/json' } }
    //         );
            
    //         console.log('User Details:', res?.data?.user);
    //         localStorage.setItem("UserData", JSON.stringify(res?.data?.user))
    //         // Handle user authentication (e.g., save user info in state/context)
    //         // alert("Hello")
    //         window.location.href='/home'
    //         // navigate('/'); // Redirect to your app's dashboard
    //     } catch (err) {
    //         console.error('GitHub Auth Error:', err);
    //     }
    //     finally{
    //         setLoading(false);
    //     }
    // };

    const getAuthCode = () => {
        const githubOAuthURL = `https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_GITHUB_ID}&redirect_uri=${process.env.REACT_APP_GITHUB_REDIRECT}&scope=read:user`;
        window.location.href = githubOAuthURL; // Redirect to GitHub OAuth
        // handleOAuth();
    };

    return (
        <button onClick={getAuthCode} className="github">
            {loading? 'Loading' : 'Continue with GitHub'}
        </button>
    );
}

