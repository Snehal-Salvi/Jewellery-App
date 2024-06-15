import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_URL } from '../../utils/constants.js';
import styles from "./auth.module.css";
import Loader from "../../components/Loader/Loader.js";
 

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

// SignIn.js
const handleSubmit = async (e) => {
  e.preventDefault();
  if (!formData.email || !formData.password) {
    return setErrorMessage('Please fill out all fields.');
  }
  try {
    setLoading(true);
    setErrorMessage(null);
    const res = await fetch(`${BACKEND_URL}/api/auth/signin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      const errorData = await res.json();
      setErrorMessage(errorData.message || 'Error signing in');
      setLoading(false);
      return;
    }

    const data = await res.json();
    setLoading(false);

 
    localStorage.setItem('access_token', data.token);
 
    window.dispatchEvent(new Event('storage'));
 
    navigate('/search');
  } catch (error) {
    setErrorMessage(error.message);
    setLoading(false);
  }
};


  return (
    <div className={styles.authContainer}>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        {errorMessage && <div className="alert alert-danger" role="alert">{errorMessage}</div>}
        
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" placeholder="abc@email.com" id="email" onChange={handleChange} />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input type="password" placeholder="*********" id="password" onChange={handleChange} />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? <Loader /> : 'Sign In'}
        </button>
      </form>

      <div>
        <span>Don't have an account? </span>
        <Link to="/signup">SignUp</Link>
      </div>
    </div>
  );
}
