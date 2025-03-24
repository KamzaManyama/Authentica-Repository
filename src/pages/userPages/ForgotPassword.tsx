import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Logo from '../../assets/images/AuthLogo.jpeg';
import { FaArrowLeft } from 'react-icons/fa';

interface ForgotPasswordScreenProps {
  onNavigate: (screen: 'welcome' | 'login' | 'signup' | 'forgotPassword') => void;
}

const ForgotPasswordScreen: React.FC<ForgotPasswordScreenProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Reset password for:', email);
    // Add password reset logic here
    setIsSubmitted(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden relative"
    >
      {/* Subtle background decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full -mr-32 -mt-32 z-0" />
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-50 rounded-full -ml-20 -mb-20 z-0" />
      
      <div className="relative z-10 p-8">
        <div className="flex items-center mb-6">
          <motion.button
            whileHover={{ x: -3 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onNavigate('login')}
            className="text-blue-600 hover:text-blue-800 p-2"
          >
            <FaArrowLeft />
          </motion.button>
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-2xl font-bold text-center text-blue-800 flex-1 pr-8"
          >
            Reset Password
          </motion.h1>
        </div>

        <motion.div
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-center mb-6"
        >
          <img src={Logo} alt="Logo" className="w-28 h-auto mx-auto mb-3 drop-shadow-sm" />
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="h-0.5 w-12 bg-blue-400 mx-auto mb-2"
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-blue-600 text-sm font-light"
          >
            Recover your account access
          </motion.p>
        </motion.div>

        {!isSubmitted ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <div className="bg-blue-50 rounded-lg p-4 mb-6">
              <p className="text-blue-800 text-sm">
                Enter your email address below and we'll send you instructions to reset your password.
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <motion.input
                  whileFocus={{ boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.3)" }}
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.03, backgroundColor: "#2563eb" }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium transition-all duration-300 shadow-md hover:shadow-lg mb-4"
              >
                SEND RESET LINK
              </motion.button>
            </form>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="bg-green-50 border border-green-100 rounded-lg p-4 mb-6">
              <p className="text-green-800 text-sm">
                <strong>Success!</strong> Check your email for password reset instructions.
              </p>
            </div>
            
            <p className="text-gray-600 text-sm mb-6">
              If you don't receive an email within a few minutes, please check your spam folder or try again.
            </p>
            
            <motion.button
              whileHover={{ scale: 1.03, backgroundColor: "#2563eb" }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsSubmitted(false)}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium transition-all duration-300 shadow-md hover:shadow-lg mb-4"
            >
              TRY AGAIN
            </motion.button>
            
            <motion.button
              whileHover={{ color: "#2563eb" }}
              onClick={() => onNavigate('login')}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
            >
              Back to Login
            </motion.button>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="mt-6 text-center"
        >
          <p className="text-gray-500 text-xs">
            Protected by enterprise-grade security
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ForgotPasswordScreen;