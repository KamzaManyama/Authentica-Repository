import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Logo from '../../assets/images/AuthLogo.jpeg';
import { FaEye, FaEyeSlash, FaArrowLeft } from 'react-icons/fa';
import Modal from '../userPages/Modal';

interface SignupScreenProps {
    onNavigate: (screen: 'welcome' | 'login' | 'signup' | 'forgotPassword') => void;
}

const SignupScreen: React.FC<SignupScreenProps> = ({ onNavigate }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Create account with:', {
      firstName,
      lastName,
      email,
      phone,
      password,
      termsAccepted,
    });
    // Add signup logic here
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="bg-white rounded-xl shadow-xl w-full max-w-md max-h-[85vh] overflow-hidden relative p-4"
    >
      {/* Subtle background decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full -mr-32 -mt-32 z-0" />
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-50 rounded-full -ml-20 -mb-20 z-0" />
      
      <div className="relative z-10 h-full flex flex-col">
        <div className="flex items-center p-6 pb-2">
          <motion.button
            whileHover={{ x: -3 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onNavigate('welcome')}
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
            Create Account
          </motion.h1>
        </div>

        <motion.div
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-center px-6 pb-3"
        >
          <img src={Logo} alt="Logo" className="w-24 h-auto mx-auto mb-2 drop-shadow-sm" />
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
            Join Authentica today
          </motion.p>
        </motion.div>

        <div className="overflow-y-auto flex-1 px-6 pb-6">
          <motion.form
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                  First Name
                </label>
                <motion.input
                  whileFocus={{ boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.3)" }}
                  type="text"
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                  placeholder="First name"
                  required
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name
                </label>
                <motion.input
                  whileFocus={{ boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.3)" }}
                  type="text"
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                  placeholder="Last name"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <motion.input
                whileFocus={{ boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.3)" }}
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                placeholder="Your email"
                required
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number <span className="text-gray-400 text-xs">(Optional)</span>
              </label>
              <motion.input
                whileFocus={{ boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.3)" }}
                type="tel"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                placeholder="Phone number"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <motion.input
                  whileFocus={{ boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.3)" }}
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                  placeholder="Create password"
                  required
                />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </motion.button>
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <motion.input
                  whileFocus={{ boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.3)" }}
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
                    confirmPassword && password !== confirmPassword 
                      ? 'border-red-300 bg-red-50' 
                      : 'border-gray-300'
                  }`}
                  placeholder="Confirm password"
                  required
                />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </motion.button>
              </div>
              {confirmPassword && password !== confirmPassword && (
                <p className="text-red-500 text-xs mt-1">Passwords do not match</p>
              )}
            </div>

            <div className="flex items-center mt-2">
              <input
                type="checkbox"
                id="terms"
                checked={termsAccepted}
                onChange={() => setTermsAccepted(!termsAccepted)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                required
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                I agree to the{' '}
                <motion.button
                  whileHover={{ color: "#2563eb" }}
                  type="button"
                  onClick={() => setIsModalOpen(true)} // Open Modal
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
                >
                  Terms & Conditions
                </motion.button>
              </label>
            </div>

            <motion.button
              whileHover={{ scale: termsAccepted && password === confirmPassword ? 1.03 : 1 }}
              whileTap={{ scale: termsAccepted && password === confirmPassword ? 0.98 : 1 }}
              type="submit"
              disabled={!termsAccepted || password !== confirmPassword}
              className={`w-full py-2.5 rounded-lg font-medium mt-4 transition-all duration-300 shadow-md ${
                termsAccepted && password === confirmPassword
                  ? 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              CREATE ACCOUNT
            </motion.button>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="text-center mt-4 pb-2"
            >
              <span className="text-gray-600 text-sm">Already have an account?</span>{' '}
              <motion.button
                whileHover={{ color: "#2563eb" }}
                type="button"
                onClick={() => onNavigate('login')}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
              >
                Login
              </motion.button>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.6 }}
              className="text-center mt-2"
            >
              <p className="text-gray-500 text-xs">
                Protected by enterprise-grade security
              </p>
            </motion.div>
          </motion.form>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </motion.div>
  );
};

export default SignupScreen;