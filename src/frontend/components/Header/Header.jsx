import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from 'react-router-dom'
import "./Header.css"; // Import the CSS file for styles
import { Home, Building, MapPin, Phone, Search } from "lucide-react";
import { dataContext } from "../UserContext/UserContext";

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

  // const user = JSON.parse(localStorage.getItem("UserData"));
  // console.log(user)

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
          <img src={`${user && user.picture}`} width={50} height={50} alt={''}/>
        <button onClick={handlelogout}>Logout</button>
      </nav>
      <button className="menu-toggle" onClick={toggleMenu}>
        ☰
      </button>
    </header>
  );
};

export default Header;
