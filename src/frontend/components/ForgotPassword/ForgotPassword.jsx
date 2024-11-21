import React, { useState } from 'react';
import { Mail } from 'lucide-react'; // Importing Lucide icon
import './ForgotPassword.css'; // Import the CSS file

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    try {
      // Simulate API call
      console.log('Forgot password request submitted for email:', email);
      setMessage('Password reset instructions have been sent to your email.');
    } catch (err) {
      console.error(err.message || 'Error in sending password reset email');
      setError('Failed to send reset email. Please try again later.');
    }
  };

  return (
    <div className="forgot-password-container">
      <h2>Forgot Password</h2>
      <p>Enter your email address, and we’ll send you instructions to reset your password.</p>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">
            <Mail className="icon" />
            Email Address:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleChange}
            placeholder="Enter your email"
          />
          {error && <small className="error">{error}</small>}
        </div>
        <button type="submit" className="submit-button">
          Send Reset Instructions
        </button>
      </form>
      {message && <p className="success-message">{message}</p>}
    </div>
  );
};

export default ForgotPassword;
