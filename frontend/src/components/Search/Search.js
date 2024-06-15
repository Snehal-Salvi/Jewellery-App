// Search.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {  useNavigate } from 'react-router-dom';  
import { BACKEND_URL } from '../../utils/constants';
import styles from './search.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export default function Search() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();  

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/companies`);
      setCompanies(response.data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${BACKEND_URL}/api/companies/search?query=${searchQuery}`);
      setCompanies(response.data);
      setLoading(false);
    } catch (error) {
      setError(error.response.data.message); 
      setLoading(false);
    }
  };
  

  const handleChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleCompanyClick = (companyId) => {
    // Redirect to company details page using company ID
    navigate(`/company/${companyId}`);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <div className={`input-group mb-3 ${styles.searchBar}`}>
        <input
          type="text"
          className="form-control"
          placeholder="Search companies..."
          value={searchQuery}
          onChange={handleChange}
        />
        <div className="input-group-append">
          <button  className={styles.searchButton} onClick={handleSearch}>
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
      </div>
      <div className={styles.companyCardsContainer}>
        {companies.map(company => (
          <div
            key={company._id}
            className={styles.companyCard}
            onClick={() => handleCompanyClick(company._id)} // Handle click on company card
          >
            <img src={company.companyLogo} alt={`${company.name} Logo`} className={styles.companyLogo} />
            <div className={styles.companyName}>{company.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
