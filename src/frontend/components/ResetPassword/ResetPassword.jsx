import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Key } from 'lucide-react'; // Importing Lucide icons
import './ResetPassword.css'; // Import the CSS file

const ResetPassword = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({
    newPassword: '',
    confirmPassword: '',
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
    const newErrors = { newPassword: '', confirmPassword: '' };

    if (!formData.newPassword || formData.newPassword.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters long.';
      isValid = false;
    }

    if (formData.confirmPassword !== formData.newPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        // Replace with your API call
        console.log('Password reset successfully', formData);
        alert('Password reset successful!');
        navigate('/login'); // Redirect to login page
      } catch (err) {
        console.error(err.message || 'Password reset failed');
        alert('An error occurred while resetting your password.');
      }
    }
  };

  return (
    <div className="reset-password-container">
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="newPassword">
            <Lock className="icon" />
            New Password:
          </label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            placeholder="Enter your new password"
          />
          {errors.newPassword && (
            <small className="error">{errors.newPassword}</small>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">
            <Key className="icon" />
            Confirm Password:
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm your new password"
          />
          {errors.confirmPassword && (
            <small className="error">{errors.confirmPassword}</small>
          )}
        </div>
        <button type="submit" className="reset-button">
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
