import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import styles from "./navbar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faAngleDown, faBars } from "@fortawesome/free-solid-svg-icons";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    setSearchOpen(false); // Close search when menu opens
  };

  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
    setMenuOpen(false); // Close menu when search opens
  };

  return (
    <div>
      <nav className={styles.header}>
        <div className={styles.navbarSection}>
          <div className={styles.appName}>
            <Link to="/" className={styles.link}>
              <span className={styles.sarafa}>sarafa</span>
              <span className={styles.bazar}>bazar</span>
              <img src={logo} alt="app-logo" className={styles.logo} />
            </Link>
          </div>

          {/* Search Bar - Initially hidden on mobile */}
          <div
            className={`input-group mb-4 border rounded-pill p-1 ${styles.searchBar} ${searchOpen ? styles.show : ''}`}
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

          {/* Login Links - Hide on small screens */}
          <div className={styles.loginLinks}>
            <Link to="/signin">Sign In</Link>
            <span> | </span>
            <Link to="/signup">Sign Up</Link>
          </div>

          {/* Hamburger Icon for Mobile */}
          <div className={`${styles.hamburger} ${styles.hamburgerIcon}`} onClick={toggleMenu}>
            <FontAwesomeIcon icon={faBars} />
          </div>
        </div>

        {/* Dropdown Menu - Initially hidden on mobile */}
        <div className={`${styles.dropdown} ${menuOpen ? styles.show : ''}`}>
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
