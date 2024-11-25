import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from 'react-router-dom'
import "./Header.css"; // Import the CSS file for styles
import { Home, Building, MapPin, Phone, Search } from "lucide-react";
import { dataContext } from "../UserContext/UserContext";
import GitHubSignIn from "../GithubSignIn/GitHubSignIn";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // const user = location.state;

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, setUser } = useContext(dataContext);
  console.log(user);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handlelogout = async() => {
    try{
      const res = await axios.get('/api/logout', {withCredentials: true});
      localStorage.removeItem('UserData');
      setUser(null)
      navigate('/login');
      console.log(res.data.success)
    }
    catch(err){
      console.log(err.message)
    }
  }  

  const [loading, setLoading] = useState(null)
  // const { code } = useParams();
  const githubOAuthURL = `https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_GITHUB_ID}&redirect_uri=${process.env.REACT_APP_GITHUB_REDIRECT}&scope=read:user`;
  // const { setUser } = useContext(dataContext);

  useEffect(() => {
      // setLoading(true)
      // const queryString = window.location.search;
      handleOAuth();
      
  }, [window.location.search, loading]);

  const handleOAuth = () => {
      // const githubOAuthURL = `https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_GITHUB_ID}&redirect_uri=${process.env.REACT_APP_GITHUB_REDIRECT}&scope=read:user`;
      // window.location.href = githubOAuthURL;
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');
      if (code) {
          // alert("Hello")
          setLoading(true)
      // Exchange the code for user details
          exchangeCodeForToken(code);
      }
  }

  const exchangeCodeForToken = async (code) => {
      
      try {
          setLoading(true)
          const res = await axios.post(
              `/api/auth/github`,
              { code },
              { withCredentials: true, headers: { 'Content-Type': 'application/json' } }
          );
          
          console.log('User Details:', res?.data?.user);
          localStorage.setItem("UserData", JSON.stringify(res?.data?.user))
          // Handle user authentication (e.g., save user info in state/context)
          // alert("Hello")
          setLoading(true)
          setUser(JSON.parse(localStorage.getItem('UserData')))
          window.location.href='/home'
          
          // navigate('/'); // Redirect to your app's dashboard
      } catch (err) {
          console.error('GitHub Auth Error:', err);
      }
      finally{
          setLoading(true);
      }
  };


  return (
    <header className="header">
      <div className="logo"> 
        <Home size={24} />
        <span>RealEstatePro</span>
      </div>
      <nav className={`nav ${isMenuOpen ? "nav--open" : ""}`}>
          <a href="/">Home</a>
          <a href="/about">About Us</a>
          <a href="#services">Services</a>
          <a href="/contact">Contact</a>
          {/* <img src={JSON.parse(localStorage.getItem("UserData")) && JSON.parse(localStorage.getItem("UserData")).picture} width={50} height={50} alt={''}/> */}
          <img src={`${user && user.picture || user?.avatar}`} width={50} height={50} alt={''}/>
        <button onClick={handlelogout}>Logout</button>
        {/* <GitHubSignIn/> */}
      </nav>
      <button className="menu-toggle" onClick={toggleMenu}>
        ☰
      </button>
    </header>
  );
};

export default Header;
