import React from 'react';
import { motion } from 'framer-motion';
import Logo from '../../assets/images/Screenshot_2025-03-17_230737-removebg-preview.png';

interface WelcomeScreenProps {
    onNavigate: (screen: 'welcome' | 'login' | 'signup' | 'forgotPassword') => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onNavigate }) => {
  return (
    <div className="h-full w-full flex flex-col relative overflow-hidden ">
      {/* Abstract background elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-400 bg-opacity-20 rounded-full -mr-32 -mt-32 z-0" />
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-400 bg-opacity-20 rounded-full -ml-20 -mb-20 z-0" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="flex-1 flex flex-col justify-center items-center px-8 py-6 z-10"
      >
        <motion.div
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <img 
            src={Logo} 
            alt="Authentica Logo" 
            className="w-42 h-auto mx-auto mb-4 drop-shadow-lg" 
          />
          
          
          
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="h-0.5 w-12 bg-blue-300 mx-auto mb-3"
          />
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-blue-200 text-sm font-light"
          >
            Verification with unwavering precision
          </motion.p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="w-full space-y-4"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onNavigate('login')}
            className="w-full bg-white text-blue-900 py-3 rounded-lg font-medium text-base shadow-md transition-all duration-300"
          >
            Sign In
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02, backgroundColor: "rgba(255, 255, 255, 0.15)" }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onNavigate('signup')}
            className="w-full bg-transparent text-white py-3 rounded-lg font-medium text-base border border-white border-opacity-40 backdrop-blur-sm hover:border-opacity-80 transition-all duration-300"
          >
            Create Account
          </motion.button>
          
          <div className="text-center pt-4">
            <motion.button
              onClick={() => console.log('Continue as guest')}
              className="text-blue-400 text-xs duration-300"
            >
              Continue as Guest
            </motion.button>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-8 text-center"
        >
          <p className="text-blue-300 text-xs uppercase tracking-wider font-medium">
            Enterprise-grade security
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default WelcomeScreen;
