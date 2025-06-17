import { memo, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

const apiUrl = import.meta.env.VITE_BACKEND_URL;

const Newsletter = memo(() => {
  const [email, setEmail] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubscription = async () => {
    try {
      const response = await axios.post(`${apiUrl}/api/add/newsletter/subscription`, { email });
      if (response.status === 200) {
        setEmail('');
        setSuccessMessage(response.data.message); // Set the success message
        setErrorMessage(''); // Set the error message
        // Optionally hide the success message after 5 seconds
        setTimeout(() => setSuccessMessage(''), 5000);
      }
    } catch (error) {
      if (error) {
        setSuccessMessage('')
        setErrorMessage(error.response?.data?.message || 'Error subscribing to newsletter')
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add newsletter subscription logic here
    if (email) {
      handleSubscription();
    }
  };

  return (
    <div className="bg-[var(--background-color)] rounded-lg p-4 shadow-lg">
      <h3 className="text-lg font-semibold text-[var(--themeColor)] mb-2">Join Our Newsletter</h3>
      <p className="text-sm text-[var(--text-color)] mb-3">Get updates on new products and special offers</p>

      {/* Success Message */}
      {successMessage && (
        <div className="bg-green-100 text-green-800 p-2 mb-4 rounded">
          {successMessage}
        </div>
      )}
      {errorMessage && (
        <div className=" text-red-500 p-2  rounded">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email address"
          required
          className="px-3 py-2 rounded border border-[var(--neutral-color)] focus:outline-none focus:border-[var(--accent-color)] flex-grow"
        />
        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-[var(--accent-color)] text-white px-4 py-2 rounded font-medium text-sm"
        >
          Subscribe
        </motion.button>
      </form>
    </div>
  );
});

export default Newsletter;