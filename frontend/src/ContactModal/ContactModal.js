import React, { useState } from 'react';
import axios from 'axios'; // Import Axios for making HTTP requests
import styles from './contactModal.module.css'; // Import your CSS module for styling
import { BACKEND_URL } from '../utils/constants';

export default function ContactModal({ isOpen, onClose, companyId }) {
  const [showModal, setShowModal] = useState(isOpen);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    query: ''
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false); // State for success message

  const closeModal = () => {
    setShowModal(false);
    onClose(); // Notify parent component to close modal
    setSuccess(false); // Reset success state on modal close
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Check if all required fields are filled
      if (!formData.name || !formData.email || !formData.query) {
        setError('All fields are required');
        return;
      }

      // Make a POST request to your backend API
      const response = await axios.post(`${BACKEND_URL}/api/contact`, {
        companyId: companyId,
        userName: formData.name,
        userEmail: formData.email,
        userQuery: formData.query
      });

    
      setSuccess(true); // Set success state to true
    
    } catch (error) {
   
      setError('Failed to send email. Please try again.');
    }
  };

  // Update modal visibility when props change
  React.useEffect(() => {
    setShowModal(isOpen);
    setError(null); // Clear error when modal opens or closes
    setSuccess(false); // Reset success state on modal open or close
  }, [isOpen]);

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
              {error && <p className={styles.error}>{error}</p>} {/* Display error message if exists */}
              {success && <p className={styles.success}>Email sent successfully!</p>} {/* Display success message if exists */}
              <button type="submit" className={styles.submitButton}>
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
