import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BACKEND_URL } from '../../utils/constants';
import styles from './search.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Loader from '../Loader/Loader';

export default function Search() {
  const [companies, setCompanies] = useState([]); // State to store list of companies
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [error, setError] = useState(null); // State to manage error state
  const [searchQuery, setSearchQuery] = useState(''); // State to store search query
  const navigate = useNavigate(); // Hook from react-router-dom for navigation

  useEffect(() => {
    fetchCompanies(); // Fetch companies on component mount
  }, []);

  // Function to fetch all companies
  const fetchCompanies = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/companies`);
      setCompanies(response.data);
      setLoading(false);
    } catch (error) {
      setError(error); // Set error state if request fails
      setLoading(false);
    }
  };

  // Function to handle search based on user input
  const handleSearch = async () => {
    setLoading(true); // Set loading state while fetching data
    try {
      const response = await axios.get(`${BACKEND_URL}/api/companies/search?query=${searchQuery}`);
      setCompanies(response.data); // Update companies based on search results
      setLoading(false);
    } catch (error) {
      setError(error.response.data.message); // Set error message if search fails
      setLoading(false);
    }
  };

  // Function to update searchQuery state based on input change
  const handleChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Function to navigate to company details page on card click
  const handleCompanyClick = (companyId) => {
    navigate(`/company/${companyId}`); // Redirect to company details page
  };

  // Render loading message while fetching data
  if (loading) return <div> <Loader /></div>;

  // Render error message if data fetching fails
  if (error) return <div>Error: {error.message}</div>;

  // Render search input and company cards once data is loaded
  return (
    <div>
      {/* Search input field */}
      <div className={`input-group mb-3 ${styles.searchBar}`}>
        <input
          type="text"
          className="form-control"
          placeholder="Search companies..."
          value={searchQuery}
          onChange={handleChange}
        />
        <div className="input-group-append">
          {/* Search button */}
          <button className={styles.searchButton} onClick={handleSearch}>
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
      </div>

      {/* Company cards */}
      <div className={styles.companyCardsContainer}>
        {companies.map(company => (
          <div
            key={company._id}
            className={styles.companyCard}
            onClick={() => handleCompanyClick(company._id)}
          >
            {/* Company logo */}
            <img src={company.companyLogo} alt={`${company.name} Logo`} className={styles.companyLogo} />
            {/* Company name */}
            <div className={styles.companyName}>{company.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
