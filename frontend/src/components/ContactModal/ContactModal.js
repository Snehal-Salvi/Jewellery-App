import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./contactModal.module.css";
import { BACKEND_URL } from "../../utils/constants";
import Loader from "../../components/Loader/Loader"; // Assuming Loader component is correctly imported

export default function ContactModal({ isOpen, onClose, companyId }) {
  const [showModal, setShowModal] = useState(isOpen); // State to control modal visibility
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    query: "",
  });
  const [error, setError] = useState(null); // State for error message
  const [success, setSuccess] = useState(false); // State for success message
  const [loading, setLoading] = useState(false); // State to control loading indicator

  // Close modal function
  const closeModal = () => {
    setShowModal(false); // Hide modal
    onClose(); // Notify parent component to close modal
    setSuccess(false); // Reset success state on modal close
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Validate form fields
      if (!formData.name || !formData.email || !formData.query) {
        setError("All fields are required");
        return;
      }

      setLoading(true); // Start loading

      // Send POST request to backend API
      await axios.post(`${BACKEND_URL}/api/contact`, {
        companyId: companyId,
        userName: formData.name,
        userEmail: formData.email,
        userQuery: formData.query,
      });

      // Update state on successful submission
      setSuccess(true);
    } catch (error) {
      // Handle error on failed submission
      setError("Failed to send email. Please try again.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Effect to update modal state when isOpen prop changes
  useEffect(() => {
    setShowModal(isOpen); // Set modal visibility based on isOpen prop
    setError(null); // Clear error message on modal open
    setSuccess(false); // Reset success state on modal open
    setFormData({ name: "", email: "", query: "" }); // Clear form data on modal open
  }, [isOpen]);

  // JSX rendering
  return (
    <>
      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h2>Contact Seller</h2>
              <span className={styles.close} onClick={closeModal}>
                &times;
              </span>
            </div>
            {loading ? (
              <Loader /> // Display loader while loading
            ) : (
              <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="query">Query</label>
                  <textarea
                    id="query"
                    name="query"
                    value={formData.query}
                    onChange={handleChange}
                    rows={4}
                    required
                  ></textarea>
                </div>
                {error && <p className={styles.error}>{error}</p>} {/* Display error message if present */}
                {success && (
                  <p className={styles.success}>Email sent successfully!</p>
                )} {/* Display success message if sent successfully */}
                <button type="submit" className={styles.submitButton}>
                  Submit
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
