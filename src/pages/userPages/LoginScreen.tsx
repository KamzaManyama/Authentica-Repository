import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Logo from '../../assets/images/AuthLogo.png';
import { FaEye, FaEyeSlash, FaFingerprint, FaArrowLeft } from 'react-icons/fa';

interface LoginScreenProps {
    onNavigate: (screen: 'welcome' | 'login' | 'signup' | 'forgotPassword') => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login with:', { email, password, rememberMe });
    // Add login logic here
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="bg-white rounded-xl shadow-xl w-full max-w-md p-8 relative overflow-hidden"
    >
      {/* Subtle background decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full -mr-32 -mt-32 z-0" />
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-50 rounded-full -ml-20 -mb-20 z-0" />
      
      <div className="relative z-10">
        <div className="flex items-center mb-6">
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
            Login
          </motion.h1>
        </div>

        <motion.div
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-center mb-6"
        >
          <img src={Logo} alt="Logo" className="w-32 h-auto mx-auto mb-3 drop-shadow-sm" />
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
            Welcome back to Authentica
          </motion.p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email or Phone
            </label>
            <motion.input
              whileFocus={{ boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.3)" }}
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              placeholder="Enter your email or phone"
              required
            />
          </div>

          <div className="mb-4">
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
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                placeholder="Enter your password"
                required
              />
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors pointer-events-auto"
                style={{ zIndex: 10 }}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </motion.button>
            </div>
          </div>

          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="remember" className="ml-2 block text-sm text-gray-600">
                Remember Me
              </label>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              type="button"
              className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
              onClick={() => onNavigate('forgotPassword')}
            >
              Forgot Password?
            </motion.button>
          </div>

          <motion.button
            whileHover={{ scale: 1.03, backgroundColor: "#2563eb" }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium transition-all duration-300 shadow-md hover:shadow-lg mb-4"
          >
            LOGIN
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.03, backgroundColor: "#f3f4f6" }}
            whileTap={{ scale: 0.98 }}
            type="button"
            className="w-full flex items-center justify-center bg-gray-100 text-gray-800 py-3 rounded-lg font-medium transition-all duration-300 shadow-sm hover:shadow"
          >
            <FaFingerprint className="mr-2" />
            Login with Biometrics
          </motion.button>
        </motion.form>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-6 text-center"
        >
          <p className="text-gray-500 text-xs">
            Don't have an account?{" "}
            <motion.button
              whileHover={{ color: "#2563eb" }}
              onClick={() => onNavigate('signup')}
              className="text-blue-600 hover:text-blue-800 transition-colors"
            >
              Create Account
            </motion.button>
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LoginScreen;