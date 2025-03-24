import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {  Home as HomeIcon, Package, FileText, User,   Camera,   Search,   X, CheckCircle, AlertCircle, AlertTriangle,  Home} from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '']);
  const [showCamera, setShowCamera] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [userName, setUserName] = useState('Alex');

  const [recentScans, setRecentScans] = useState([
    { id: 1, name: 'Nike Air Max', status: 'verified', date: 'Today, 10:32 AM' },
    { id: 2, name: 'Ray-Ban Sunglasses', status: 'verified', date: 'Yesterday, 2:15 PM' },
    { id: 3, name: 'Louis Vuitton Bag', status: 'fake', date: 'Mar 15, 9:45 AM' },
    { id: 4, name: 'Apple AirPods Pro', status: 'warning', date: 'Mar 12, 5:20 PM' },
  ]);
  
const navigationItems = [
    { id: 'home', icon: Home, label: 'Home', route: '/user' },
    { id: 'products', icon: Package, label: 'Products', route: '/products' },
    { id: 'scan', icon: Search, label: 'Scan', special: true, route: '/user/scan' },
    { id: 'reports', icon: FileText, label: 'Reports', route: '/reports' },
    { id: 'profile', icon: User, label: 'Profile', route: '/profile' }
];



  // Handle OTP input change
  const handleOtpChange = (index: number, value: string | any[]) => {
    if (value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = typeof value === 'string' ? value : '';
      setOtp(newOtp);
      
      // Move to next input on entry
      if (value && index < 4) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        if (nextInput) nextInput.focus();
      }
    }
  };
  
  // Handle backspace in OTP inputs
  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && index > 0 && otp[index] === '') {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };
  
  // Verify OTP
  const verifyOtp = () => {
    setIsVerifying(true);
    
    // Simulate API call
    setTimeout(() => {
      const code = otp.join('');
      // For demo: OTPs starting with '1' are valid, '2' for warning, others are fake
      let status = 'fake';
      if (code.startsWith('1')) {
        status = 'verified';
      } else if (code.startsWith('2')) {
        status = 'warning';
      }
      
      setVerificationStatus(status);
      setIsVerifying(false);
      
      // Add to recent scans if verified
      if (status !== 'fake') {
        const newScan = {
          id: Date.now(),
          name: `Product #${code}`,
          status: status,
          date: 'Just now'
        };
        setRecentScans(prev => [newScan, ...prev.slice(0, 3)]);
      }
    }, 1500);
  };
  
  // Verify QR code
  const verifyQR = () => {
    setShowCamera(false);
    setIsVerifying(true);
    
    // Simulate API call
    setTimeout(() => {
      // Demo verification - random status
      const rand = Math.random();
      let status = 'fake';
      
      if (rand > 0.7) {
        status = 'verified';
      } else if (rand > 0.4) {
        status = 'warning';
      }
      
      setVerificationStatus(status);
      setIsVerifying(false);
      
      // Add to recent scans if verified
      if (status !== 'fake') {
        const newScan = {
          id: Date.now(),
          name: `Scanned Product`,
          status: status,
          date: 'Just now'
        };
        setRecentScans(prev => [newScan, ...prev.slice(0, 3)]);
      }
      
      // Show result in a modal
      setShowOtpModal(true);
    }, 1500);
  };
  
  // Reset verification status when modal/camera is closed
  useEffect(() => {
    if (!showOtpModal && !showCamera) {
      setTimeout(() => {
        setVerificationStatus(null);
        setOtp(['', '', '', '', '']);
      }, 300);
    }
  }, [showOtpModal, showCamera]);
  
  // Get status icon and color
  const getStatusDetails = (status: string) => {
    switch(status) {
      case 'verified':
        return { 
          icon: <CheckCircle size={18} />, 
          color: 'text-emerald-500',
          bgColor: 'bg-emerald-50',
          textColor: 'text-emerald-800',
          borderColor: 'border-emerald-200'
        };
      case 'fake':
        return { 
          icon: <AlertCircle size={18} />, 
          color: 'text-red-500',
          bgColor: 'bg-red-50',
          textColor: 'text-red-800',
          borderColor: 'border-red-200'
        };
      case 'warning':
        return { 
          icon: <AlertTriangle size={18} />, 
          color: 'text-amber-500',
          bgColor: 'bg-amber-50',
          textColor: 'text-amber-800',
          borderColor: 'border-amber-200'
        };
      default:
        return { 
          icon: <CheckCircle size={18} />, 
          color: 'text-gray-500',
          bgColor: 'bg-gray-50',
          textColor: 'text-gray-800',
          borderColor: 'border-gray-200'
        };
    }
  };
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        when: "beforeChildren",
        staggerChildren: 0.1,
        duration: 0.4
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.4 }
    }
  };
  
  // Camera component
  const CameraView = () => (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black z-50 flex flex-col"
    >
      <div className="p-4 flex justify-between items-center bg-blue-900 text-white">
        <h2 className="text-xl font-bold">Scan Product QR Code</h2>
        <motion.button 
          whileTap={{ scale: 0.9 }}
          onClick={() => setShowCamera(false)}
          className="p-2"
        >
          <X size={24} />
        </motion.button>
      </div>
      
      <div className="flex-1 flex items-center justify-center relative">
        <div className="absolute inset-0 bg-black opacity-70"></div>
        
        {/* Camera viewfinder */}
        <div className="relative z-10 w-64 h-64 border-4 border-blue-400 rounded-lg">
          <div className="absolute top-0 left-0 w-10 h-10 border-t-4 border-l-4 border-blue-400 -m-2"></div>
          <div className="absolute top-0 right-0 w-10 h-10 border-t-4 border-r-4 border-blue-400 -m-2"></div>
          <div className="absolute bottom-0 left-0 w-10 h-10 border-b-4 border-l-4 border-blue-400 -m-2"></div>
          <div className="absolute bottom-0 right-0 w-10 h-10 border-b-4 border-r-4 border-blue-400 -m-2"></div>
          
          {/* Scanning animation */}
          <motion.div 
            className="absolute inset-x-0 h-1 bg-blue-400"
            initial={{ top: 0 }}
            animate={{ top: ['0%', '100%', '0%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        
        <div className="absolute bottom-10 left-0 right-0 text-center text-white">
          <p>Position the QR code within the frame</p>
        </div>
      </div>
      
      <motion.div className="p-4">
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="w-full py-3 bg-blue-600 text-white font-bold rounded-xl shadow-md"
          onClick={verifyQR}
        >
          Capture & Verify
        </motion.button>
      </motion.div>
    </motion.div>
  );
  
  // Verification Result component
  const VerificationResult = () => {
    if (!verificationStatus) return null;
    
    const { icon, color, bgColor, textColor } = getStatusDetails(verificationStatus);
    
    let title, message;
    switch(verificationStatus) {
      case 'verified':
        title = "Authentic Product";
        message = "This product has been verified as authentic.";
        break;
      case 'fake':
        title = "Counterfeit Alert";
        message = "This product could not be verified and may be counterfeit.";
        break;
      case 'warning':
        title = "Verification Warning";
        message = "This product appears genuine but requires further verification.";
        break;
      default:
        title = "Verification Status";
        message = "Status unknown.";
    }
    
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`mt-6 ${bgColor} p-4 rounded-xl flex items-center`}
      >
        <div className={`${color} mr-3`}>{icon}</div>
        <div>
          <h3 className={`font-bold ${textColor}`}>{title}</h3>
          <p className={`${color} text-sm`}>{message}</p>
        </div>
      </motion.div>
    );
  };
  
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col relative w-screen">
      {/* Sticky Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="sticky top-0 z-30 w-full bg-gradient-to-r from-blue-700 to-blue-900 pt-8 pb-4 px-4 shadow-md"
      >
        <div className="flex justify-between items-center max-w-lg mx-auto">
          <div>
            <h1 className="text-2xl font-bold text-white mb-1">Hello, {userName} 👋</h1>
            <p className="text-blue-100 text-sm">Scan and verify products instantly</p>
          </div>
         
        </div>
      </motion.header>
      
      {/* Scrollable content */}
      <div className="flex-1 flex flex-col items-center justify-center overflow-y-auto pb-20">
        <motion.div 
            className="px-4 pt-6 pb-24 relative z-10 max-w-lg text-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {/* Page Title & Description */}
            <motion.div variants={itemVariants} className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Scan & Verify</h1>
            <p className="text-gray-500 text-sm mt-2">
                Use the scanner below to check product authenticity. You can also enter a 5-digit OTP manually.
            </p>
            </motion.div>

            {/* Quick Scan Button */}
            <motion.div variants={itemVariants} className="flex justify-center mt-4 mb-8">
            <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowCamera(true)}
                className="w-48 h-48 rounded-full bg-white shadow-lg flex items-center justify-center relative"
            >
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 opacity-10"></div>
                <div className="absolute inset-2 rounded-full border-2 border-blue-500/30"></div>
                <div className="absolute inset-6 rounded-full border-2 border-blue-600/20"></div>
                <div className="w-28 h-28 rounded-full bg-blue-600 flex items-center justify-center shadow-md">
                <Camera size={40} className="text-white" />
                </div>
                <motion.div
                className="absolute inset-0 rounded-full border-4 border-blue-500/30"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
            </motion.button>
            </motion.div>

            {/* Scan Guidance Text */}
            <motion.div variants={itemVariants} className="text-center mb-8">
            <p className="text-gray-500 text-sm">Tap the button above to start scanning.</p>
            </motion.div>

            {/* OTP Button */}
            <motion.div variants={itemVariants} className="w-full mb-8">
            <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowOtpModal(true)}
                className="w-full py-4 bg-white rounded-xl shadow flex items-center justify-center"
            >
                <div className="flex items-center">
                <div className="mr-3 bg-blue-100 p-2 rounded-full">
                    <Search size={20} className="text-blue-600" />
                </div>
                <div className="text-left">
                    <h3 className="font-semibold text-gray-800">Enter 5-digit OTP</h3>
                    <p className="text-gray-500 text-xs">Manually verify with product code</p>
                </div>
                </div>
            </motion.button>

            </motion.div>

            <motion.div
            variants={itemVariants}
            className="text-blue-600 mt-8 cursor-pointer"
            onClick={() => setShowOtpModal(true)}
            >
            <p className="text-sm">Need Help? Tap here for instructions.</p>
            </motion.div>


            {/* Verification Result */}
            <VerificationResult />
        </motion.div>
        </div>

      
      {/* OTP Modal */}
      {showOtpModal && (
        <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      >
      
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl w-full max-w-md overflow-hidden"
          >
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-5">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-white">Enter OTP Code</h3>
                <motion.button 
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowOtpModal(false)}
                  className="text-white p-1"
                >
                  <X size={24} />
                </motion.button>
              </div>
              <p className="text-blue-100 text-sm mt-1">Enter the 5-digit code from your product</p>
            </div>
            
            <div className="p-6">
              <div className="flex justify-center space-x-2 mb-6">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-12 h-14 border-2 border-gray-300 rounded-lg text-center text-xl font-bold focus:border-blue-500 focus:ring focus:ring-blue-200 outline-none"
                  />
                ))}
              </div>
              
              {verificationStatus && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={`mb-4 p-4 rounded-lg ${getStatusDetails(verificationStatus).bgColor} flex items-center`}
                >
                  <div className={`${getStatusDetails(verificationStatus).color} mr-3`}>
                    {getStatusDetails(verificationStatus).icon}
                  </div>
                  <div>
                    {verificationStatus === 'verified' && (
                      <>
                        <h3 className="font-bold text-emerald-800">Authentic Product</h3>
                        <p className="text-emerald-600 text-sm">This product has been verified as authentic.</p>
                      </>
                    )}
                    {verificationStatus === 'fake' && (
                      <>
                        <h3 className="font-bold text-red-800">Counterfeit Alert</h3>
                        <p className="text-red-600 text-sm">This product could not be verified and may be counterfeit.</p>
                      </>
                    )}
                    {verificationStatus === 'warning' && (
                      <>
                        <h3 className="font-bold text-amber-800">Verification Warning</h3>
                        <p className="text-amber-600 text-sm">This product appears genuine but requires further verification.</p>
                      </>
                    )}
                  </div>
                </motion.div>
              )}
              
              <motion.button
                whileTap={{ scale: 0.95 }}
                disabled={isVerifying || otp.join('').length !== 5}
                onClick={verifyOtp}
                className={`w-full py-3 font-bold rounded-xl shadow-md flex items-center justify-center
                  ${otp.join('').length === 5 && !isVerifying ? 
                    'bg-blue-600 text-white' : 
                    'bg-gray-300 text-gray-500'}`}
              >
                {isVerifying ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                  />
                ) : 'Verify Code'}
              </motion.button>
              
              <p className="text-gray-500 text-xs text-center mt-4">
                Can't find your code? Look for it on your product packaging or manual.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
      
      {/* Camera View */}
      {showCamera && <CameraView />}
      
      {/* Bottom Navigation */}
        <motion.div
  initial={{ y: 100 }}
  animate={{ y: 0 }}
  transition={{ delay: 0.2, type: "spring", stiffness: 300, damping: 25 }}
  className="fixed bottom-0 left-0 right-0 h-16 bg-white flex items-center justify-around -lg z-40"
>
  {navigationItems.map((item) => (
    item.special ? (
      <motion.div 
        key={item.id} 
        className="flex flex-col items-center justify-center relative -top-5"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-blue-600 w-14 h-14 rounded-full flex items-center justify-center "
          onClick={() => setShowCamera(true)}
        >
          <item.icon size={24} className="text-white" />
        </motion.button>
        <span className="text-xs mt-1 font-medium text-blue-600">{item.label}</span>
      </motion.div>
    ) : (
      <Link to={item.route} key={item.id}> {/* Use Link here */}
        <motion.button
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.9 }}
          className="flex flex-col items-center justify-center p-1 relative"
          onClick={() => setActiveTab(item.id)}
        >
          {activeTab === item.id && (
            <motion.div
              layoutId="activeIndicator"
              className="absolute -top-1 w-1 h-1 bg-blue-600 rounded-full"
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          )}
          <item.icon 
            size={22} 
            className={activeTab === item.id ? 'text-blue-600' : 'text-gray-500'} 
          />
          <span className={`text-xs mt-1 ${activeTab === item.id ? 'text-blue-600 font-semibold' : 'text-gray-500'}`}>
            {item.label}
          </span>
        </motion.button>
      </Link>
    )
  ))}
</motion.div>
    </div>
  );
};

export default Dashboard;