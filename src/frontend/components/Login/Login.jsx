import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./Login.css"; // Import the CSS file
import GoogleSignIn from "../GoogleSignIn/GoogleSignIn";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const redirectPath = location.state?.from || location.state?.path || '/'

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validate = () => {
    let isValid = true;
    const newErrors = { email: "", password: "" };

    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = "Password cannot be empty.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const res = await axios.post("/api/login", formData, { withCredentials: true });
        alert("Login successful!");
        navigate(redirectPath, { replace: true });
      } catch (err) {
        console.error(err?.response?.data?.error || err?.message);
        alert("Login failed: " + (err?.response?.data?.error || err?.message));
      }
    }
  };

  

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <small className="error-message">{errors.email}</small>}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <small className="error-message">{errors.password}</small>}
        </div>
        <button className="login" type="submit">Login</button>
        
      </form>
        <GoogleSignIn />
        <div className='create'>
          <p className='create_account'><a href='/signup'>Need an Account</a></p>
          <p className='create_account'><a href='/forgot-password'>Forgot Password</a></p>
        </div>
       
    </div>
  );
};

export default Login;
