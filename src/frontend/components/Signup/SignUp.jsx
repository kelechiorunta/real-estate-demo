import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Signup.css"; // Import the CSS file

const Signup = () => {
  const navigate = useNavigate();

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

    if (!formData.password || formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const res = await axios.post("/api", formData, { withCredentials: true });
        console.log(res.data.message);
        alert("Signup successful!");
        navigate("/");
      } catch (err) {
        console.error(err?.data?.error || err?.message);
        alert("Could not sign up: " + (err?.response?.data?.error || err?.message));
      }
    }
  };

  return (
    <div className="signup-container">
      <h2>Signup</h2>
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
        <button className="submit" type="submit">Sign Up</button>
      </form>
        <div className='login_link'>
          <p className='create_account'><a href='/login'>Login As a Registered User</a></p>
        </div>
    </div>
  );
};

export default Signup;
