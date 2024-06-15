import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import styles from "./navbar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faAngleDown,
  faBars,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { BACKEND_URL } from "../../utils/constants";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false); // State to manage menu visibility
  const [searchOpen, setSearchOpen] = useState(false); // State to manage search bar visibility
  const [isAuthenticated, setIsAuthenticated] = useState(false); // State to track authentication status
  const navigate = useNavigate(); // Hook from react-router-dom for navigation

  useEffect(() => {
    // Function to check authentication status on component mount and storage change
    const checkAuthStatus = () => {
      const token = localStorage.getItem("access_token");
      setIsAuthenticated(!!token); // Update isAuthenticated state based on token presence
    };

    checkAuthStatus(); // Initial call to check authentication status

    // Event listener to update authentication status on storage change
    window.addEventListener("storage", checkAuthStatus);

    // Cleanup function to remove event listener on component unmount
    return () => {
      window.removeEventListener("storage", checkAuthStatus);
    };
  }, []);

  // Function to toggle menu visibility and close search bar
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    setSearchOpen(false); // Close search bar when menu is toggled
  };

  // Function to toggle search bar visibility and close menu
  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
    setMenuOpen(false); // Close menu when search bar is toggled
  };

  // Function to handle user logout
  const handleLogout = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });

      if (res.ok) {
        setIsAuthenticated(false); // Update authentication state to false
        localStorage.removeItem("access_token"); // Remove access token from localStorage

        navigate("/"); // Redirect to home page after logout
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  // JSX rendering
  return (
    <div>
      <nav className={styles.header}>
        <div className={styles.navbarSection}>
          <div className={styles.appName}>
            <Link to="/" className={styles.link}>
              <span className={styles.sarafa}>
                sarafa<span className={styles.bazar}>bazar</span>
              </span>
              <img src={logo} alt="app-logo" className={styles.logo} />
            </Link>
          </div>

          <div
            className={`input-group mb-4 border rounded-pill p-1 ${
              styles.searchBar
            } ${searchOpen ? styles.show : ""}`}
          >
            <div className="input-group-prepend border-0">
              <button
                id="button-addon4"
                type="button"
                className="btn btn-link text-info"
                onClick={toggleSearch}
              >
                <FontAwesomeIcon
                  icon={faSearch}
                  className={styles.searchIcon}
                />
              </button>
            </div>
            <input
              type="search"
              placeholder="Search Wholesale Jewellery Sellers and Products"
              aria-describedby="button-addon4"
              className={`form-control bg-none border-0 ${styles.input}`}
            />
          </div>

          <div className={styles.loginLinks}>
            {isAuthenticated ? (
              <>
                <button onClick={handleLogout} className={styles.logoutButton}>
                  Logout <FontAwesomeIcon icon={faSignOutAlt} />
                </button>
              </>
            ) : (
              <>
                <Link to="/signin">Sign In</Link>
                <span> | </span>
                <Link to="/signup">Sign Up</Link>
              </>
            )}
          </div>

          <div
            className={`${styles.hamburger} ${styles.hamburgerIcon}`}
            onClick={toggleMenu}
          >
            <FontAwesomeIcon icon={faBars} />
          </div>
        </div>

        <div className={`${styles.dropdown} ${menuOpen ? styles.show : ""}`}>
          <ul>
            <li>
              Gold <FontAwesomeIcon icon={faAngleDown} />
              <ul>
                <li>All</li>
                <li>Rings</li>
                <li>Earrings</li>
                <li>Bali</li>
              </ul>
            </li>
            <li>
              Diamond <FontAwesomeIcon icon={faAngleDown} />
              <ul>
                <li>All</li>
                <li>Rings</li>
                <li>Earrings</li>
                <li>Bali</li>
              </ul>
            </li>
            <li>
              Plain/CZ Casting <FontAwesomeIcon icon={faAngleDown} />
              <ul>
                <li>All</li>
                <li>Rings</li>
                <li>Earrings</li>
                <li>Bali</li>
              </ul>
            </li>
            <li>
              Turkish/Italian <FontAwesomeIcon icon={faAngleDown} />
              <ul>
                <li>All</li>
                <li>Rings</li>
                <li>Earrings</li>
                <li>Bali</li>
              </ul>
            </li>
            <li>
              Antique/Kundan <FontAwesomeIcon icon={faAngleDown} />
              <ul>
                <li>All</li>
                <li>Rings</li>
                <li>Earrings</li>
                <li>Bali</li>
              </ul>
            </li>
            <li>
              Stone <FontAwesomeIcon icon={faAngleDown} />
              <ul>
                <li>All</li>
                <li>Rings</li>
                <li>Earrings</li>
                <li>Bali</li>
              </ul>
            </li>
            <li>
              Platinum <FontAwesomeIcon icon={faAngleDown} />
              <ul>
                <li>All</li>
                <li>Rings</li>
                <li>Earrings</li>
                <li>Bali</li>
              </ul>
            </li>
            <li>
              Silver <FontAwesomeIcon icon={faAngleDown} />
              <ul>
                <li>All</li>
                <li>Rings</li>
                <li>Earrings</li>
                <li>Bali</li>
              </ul>
            </li>
            <li>
              Findings <FontAwesomeIcon icon={faAngleDown} />
              <ul>
                <li>All</li>
                <li>Rings</li>
                <li>Earrings</li>
                <li>Bali</li>
              </ul>
            </li>
            <li>
              Gemstones <FontAwesomeIcon icon={faAngleDown} />
              <ul>
                <li>All</li>
                <li>Rings</li>
                <li>Earrings</li>
                <li>Bali</li>
              </ul>
            </li>
            <li>
              More <FontAwesomeIcon icon={faAngleDown} />
              <ul>
                <li>All</li>
                <li>Rings</li>
                <li>Earrings</li>
                <li>Bali</li>
              </ul>
            </li>
            <li>Sellers</li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
