import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { BACKEND_URL } from "../../utils/constants";
import styles from "./companyDetails.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faLink,
  faPhone,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { faSquareWhatsapp } from "@fortawesome/free-brands-svg-icons";
import ContactModal from "../ContactModal/ContactModal";

export default function CompanyDetails() {
  const [company, setCompany] = useState(null); // State for storing company details
  const [loading, setLoading] = useState(true); // State for loading status
  const [error, setError] = useState(null); // State for error handling
  const [showContactModal, setShowContactModal] = useState(false); // State for modal visibility
  const { id } = useParams(); // Retrieve company ID from URL parameter
 
  useEffect(() => {
    const fetchCompanyDetails = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/companies/${id}`);
        setCompany(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
  
    fetchCompanyDetails();
  }, [id]);
  

  // Function to open contact modal
  const openContactModal = () => {
    setShowContactModal(true);
  };

  // Function to close contact modal
  const closeContactModal = () => {
    setShowContactModal(false);
  };

  // Render loading message while fetching data
  if (loading) return <div>Loading...</div>;

  // Render error message if there's an issue fetching data
  if (error) return <div>Error: {error.message}</div>;

  // Function to format the date in "Join Since DD Month, YYYY" format
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  // Render company details once loaded
  return (
    <div className={styles.detailsContainer}>
      {/* Company logo */}
      <div className={styles.companyLogo}>
        <img src={company.companyLogo} alt={`${company.name} Logo`} />
      </div>

      {/* Company details section */}
      <div className={styles.companyDetails}>
        <h1>{company.name}</h1>
        <p>{company.description}</p>
        <p>{company.addressLine1}</p>
        <p>{company.addressLine2}</p>

        {/* Contact information */}
        <p style={{ fontWeight: 900 }}>
          Contact:{" "}
          <span
            style={{
              color: "goldenrod",
              textDecoration: "underline",
              cursor: "pointer",
            }}
            onClick={openContactModal}
          >
            {company.contact}
          </span>
        </p>
        {/* Icons for phone and WhatsApp */}
        <FontAwesomeIcon className={styles.phoneIcon} icon={faPhone} />
        <FontAwesomeIcon className={styles.wpIcon} icon={faSquareWhatsapp} />

        <p>
          <FontAwesomeIcon icon={faLocationDot} /> {company.location}
        </p>

        <p>
          <FontAwesomeIcon icon={faLink} /> Join Since{" "}
          {formatDate(company.establishedDate)} |{" "}
          <span> Total Products {company.totalProducts}</span>{" "}
        </p>
      </div>

      {/* Owner details section */}
      <div className={styles.ownerDetails}>
        <h3>DIRECTOR / PARTNER / OWNER</h3>
        <img src={company.ownerImage} alt={`${company.name} Logo`} />
        <p>{company.ownerName}</p>

        {/* Button to open ContactModal */}
        <button onClick={openContactModal}>
          <FontAwesomeIcon icon={faEnvelope} /> Contact
        </button>
      </div>

      {/* Render ContactModal conditionally based on showContactModal state */}
      {showContactModal && (
        <ContactModal
          isOpen={showContactModal}
          onClose={closeContactModal}
          companyId={company._id}
        />
      )}
    </div>
  );
}
