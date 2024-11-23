import React from 'react'
import axios from axios
import { useParams } from 'react-router-dom';

export default function GitHubSignIn() {

    const githubOAuthURL = `https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_GITHUB_ID}&scope=user`;
    const getAuthCode = async() => {
        try{
            const res = await axios.get(githubOAuthURL, {withCredentials: true});
            console.log(res?.data)
        }
        catch(err){
            console.error(err?.message)
        }
    }

  return (
    <button onClick={getAuthCode}>Continue with Github</button>
  )
}
