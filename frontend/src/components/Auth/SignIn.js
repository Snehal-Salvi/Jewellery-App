import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_URL } from '../../utils/constants.js';
import styles from "./auth.module.css";
import Loader from "../../components/Loader/Loader.js";

export default function SignIn() {
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
    
    // Validate if email and password fields are filled
    if (!formData.email || !formData.password) {
      return setErrorMessage('Please fill out all fields.');
    }
    
    try {
      setLoading(true); // Set loading state to true
      setErrorMessage(null); // Clear any previous error messages
      
      // Send POST request to backend for user authentication
      const res = await fetch(`${BACKEND_URL}/api/auth/signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      // Handle unsuccessful sign-in
      if (!res.ok) {
        const errorData = await res.json(); // Parse error response JSON
        setErrorMessage(errorData.message || 'Error signing in'); // Set error message received from backend
        setLoading(false); // Set loading state to false
        return;
      }

      const data = await res.json(); // Parse successful response JSON
      setLoading(false); // Set loading state to false

      // Store access token in local storage upon successful sign-in
      localStorage.setItem('access_token', data.token);
      
      // Trigger event to notify other tabs of login status change
      window.dispatchEvent(new Event('storage'));
      
      // Navigate to '/search' page upon successful sign-in
      navigate('/search');
    } catch (error) {
      setErrorMessage(error.message); // Handle network or server errors
      setLoading(false); // Set loading state to false
    }
  };

  return (
    <div className={styles.authContainer}>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        {errorMessage && <div className="alert alert-danger" role="alert">{errorMessage}</div>}
        
        {/* Input fields for email and password */}
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" placeholder="abc@email.com" id="email" onChange={handleChange} />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input type="password" placeholder="*********" id="password" onChange={handleChange} />
        </div>

        {/* Button to submit form, disabled when loading */}
        <button type="submit" disabled={loading}>
          {loading ? <Loader /> : 'Sign In'}
        </button>
      </form>

      {/* Link to sign-up page */}
      <div>
        <span>Don't have an account? </span>
        <Link to="/signup">SignUp</Link>
      </div>
    </div>
  );
}
