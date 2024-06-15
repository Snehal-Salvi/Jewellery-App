import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_URL } from '../../utils/constants.js';
import styles from "./auth.module.css";
import Loader from "../../components/Loader/Loader.js";

export default function SignUp() {
  const [formData, setFormData] = useState({}); // State to hold form data
  const [errorMessage, setErrorMessage] = useState(null); // State to manage error messages
  const [loading, setLoading] = useState(false); // State to manage loading state
  const navigate = useNavigate(); // Hook from React Router for navigation

  // Function to update form data on input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate if all required fields are filled
    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage('Please fill out all fields.');
    }
    
    try {
      setLoading(true); // Set loading state to true
      setErrorMessage(null); // Clear any previous error messages
      
      // Send POST request to backend for user registration
      const res = await fetch(`${BACKEND_URL}/api/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      const data = await res.json(); // Parse response JSON
      
      setLoading(false); // Set loading state to false after request completes
      
      // Handle unsuccessful registration (if success flag is false)
      if (data.success === false) {
        return setErrorMessage(data.message); // Set error message received from backend
      }
      
      // If registration is successful and response is okay, navigate to signin page
      if (res.ok) {
        navigate('/signin');
      }
    } catch (error) {
      setErrorMessage(error.message); // Handle network or server errors
      setLoading(false); // Set loading state to false
    }
  };

  return (
    <div className={styles.authContainer}>
      <h1>Sign up</h1>
      <form onSubmit={handleSubmit}>
        {errorMessage && <div className="alert alert-danger" role="alert">{errorMessage}</div>}
        
        {/* Input fields for username, email, and password */}
        <div>
          <label htmlFor="username">Username</label>
          <input type="text" placeholder="username" id="username" onChange={handleChange} />
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input type="email" placeholder="abc@email.com" id="email" onChange={handleChange} />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input type="password" placeholder="password" id="password" onChange={handleChange} />
        </div>

        {/* Button to submit form, disabled when loading */}
        <button type="submit" disabled={loading}>
          {loading ? <Loader /> : 'Sign Up'}
        </button>
      </form>

      {/* Link to sign-in page */}
      <div>
        <span>Have an account? </span>
        <Link to="/signin">SignIn</Link>
      </div>
    </div>
  );
}
