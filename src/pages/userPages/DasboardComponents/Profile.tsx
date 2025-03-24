import { motion } from 'framer-motion';
import { User, Bell, Settings, ChevronRight, Shield, Key, LogOut, Home, Package, Search, FileText } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
// import axios from 'axios';

const AuthenticaProfile = () => {
  // State for user data and loading
  const [userData, setUserData] = useState({
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    joinDate: '2024-09-15',
    scansCount: 42,
    profileImage: null,
  });
  type NotificationSetting = 'newScanResults' | 'securityAlerts' | 'productUpdates' | 'marketUpdates';

  const [notificationSettings, setNotificationSettings] = useState<Record<NotificationSetting, boolean>>({
    newScanResults: true,
    securityAlerts: true,
    productUpdates: false,
    marketUpdates: false,
  });
  const [isLoading, setIsLoading] = useState(false); // Changed to false to show content immediately
  const [error, setError] = useState<string | null>(null);

  // Navigation configuration for footer
  const navigationItems = [
    { id: 'home', icon: Home, label: 'Home', route: '/user' },
    { id: 'products', icon: Package, label: 'Products', route: '/products' },
    { id: 'scan', icon: Search, label: 'Scan', special: true, route: '/user/scan' },
    { id: 'reports', icon: FileText, label: 'Reports', route: '/reports' },
    { id: 'profile', icon: User, label: 'Profile', route: '/profile' }
  ];

  // Use location to determine active tab
  const location = useLocation();
  const currentPath = location.pathname;
  
  // Set active tab based on current route
  const getActiveTabFromPath = (path: string) => {
    const tabMatch = navigationItems.find(item => 
      path === item.route || path.startsWith(`${item.route}/`)
    );
    return tabMatch ? tabMatch.id : 'profile'; // Default to profile
  };
  
  const [activeTab, setActiveTab] = useState(getActiveTabFromPath(currentPath));

  // API endpoint (commented out)
  // const API_BASE_URL = 'https://api.authentica.com/v1';

  // Fetch user data (commented out API calls)
  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);
      try {
        // Commented out API call
        /*
        const response = await axios.get(`${API_BASE_URL}/user/profile`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
          }
        });
        
        if (response.data && response.data.user) {
          setUserData(response.data.user);
        }
        
        const notifResponse = await axios.get(`${API_BASE_URL}/user/notifications/settings`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
          }
        });
        
        if (notifResponse.data && notifResponse.data.settings) {
          setNotificationSettings(notifResponse.data.settings);
        }
        */
        
        // Using hardcoded data instead
        setUserData({
          name: 'Alex Johnson',
          email: 'alex.johnson@example.com',
          joinDate: '2024-09-15',
          scansCount: 42,
          profileImage: null,
        });
        
        setNotificationSettings({
          newScanResults: true,
          securityAlerts: true,
          productUpdates: false,
          marketUpdates: false,
        });
        
        setError(null);
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError('Failed to load profile data. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // Update active tab when route changes
  useEffect(() => {
    setActiveTab(getActiveTabFromPath(currentPath));
  }, [currentPath]);

  // Toggle a notification setting (commented out API call)
  const toggleNotification = async (setting: NotificationSetting) => {
    const updatedSettings = {
      ...notificationSettings,
      [setting]: !notificationSettings[setting]
    };
    
    setNotificationSettings(updatedSettings);
    
    // Commented out API call
    /*
    try {
      await axios.put(`${API_BASE_URL}/user/notifications/settings`, {
        settings: updatedSettings
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      });
    } catch (err) {
      console.error('Error updating notification settings:', err);
      // Revert the setting if the API call fails
      setNotificationSettings(notificationSettings);
    }
    */
  };

  // Format date
  const formatDate = (dateString: string | number | Date) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Show Camera function for the scan button
  function setShowCamera(arg0: boolean) {
    console.log("Camera would open:", arg0);
    // Implementation would go here
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 w-screen">
      {/* Header Section */}
      <div className="bg-blue-700 text-white p-4 text-center shadow-md fixed top-0 left-0 w-full z-50">
    <h1 className="text-2xl font-bold">Authentica</h1>
    <p className="text-sm mt-1">Your Profile</p>
</div>

      {/* Main Content */}
      <div className="flex-1 p-4 pb-20 mt-20 ">
        {isLoading ? (
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-700"></div>
          </div>
        ) : error ? (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
            {error}
          </div>
        ) : (
          <>
            {/* User Information Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl shadow-sm p-4 mb-4 border border-gray-200"
            >
              <div className="flex items-center">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mr-4">
                  {userData.profileImage ? (
                    <img 
                      src={userData.profileImage} 
                      alt="Profile" 
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <User size={32} className="text-blue-600" />
                  )}
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">{userData.name}</h2>
                  <p className="text-gray-500 text-sm">{userData.email}</p>
                  <p className="text-gray-500 text-xs mt-1">
                    Member since {formatDate(userData.joinDate)}
                  </p>
                </div>
              </div>
              
              <div className="flex justify-between mt-4 pt-4 border-t border-gray-100">
                <div className="text-center">
                  <p className="text-xl font-bold text-blue-600">{userData.scansCount}</p>
                  <p className="text-xs text-gray-500">Total Scans</p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold text-green-600">
                    {Math.floor(userData.scansCount * 0.7)}
                  </p>
                  <p className="text-xs text-gray-500">Authentic Items</p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold text-red-600">
                    {Math.floor(userData.scansCount * 0.2)}
                  </p>
                  <p className="text-xs text-gray-500">Counterfeits</p>
                </div>
              </div>
            </motion.div>

            {/* Notification Settings */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="bg-white rounded-xl shadow-sm p-4 mb-4 border border-gray-200"
            >
              <div className="flex items-center mb-4">
                <Bell size={20} className="text-blue-600 mr-2" />
                <h3 className="text-lg font-semibold text-gray-800">Notification Preferences</h3>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-800 font-medium">New Scan Results</p>
                    <p className="text-xs text-gray-500">Get notified when your product scan is complete</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={notificationSettings.newScanResults}
                      onChange={() => toggleNotification('newScanResults')}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-800 font-medium">Security Alerts</p>
                    <p className="text-xs text-gray-500">Receive alerts about suspicious activity</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={notificationSettings.securityAlerts}
                      onChange={() => toggleNotification('securityAlerts')}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-800 font-medium">Product Updates</p>
                    <p className="text-xs text-gray-500">Get notified about new app features</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={notificationSettings.productUpdates}
                      onChange={() => toggleNotification('productUpdates')}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-800 font-medium">Market Updates</p>
                    <p className="text-xs text-gray-500">Receive alerts about market trends</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={notificationSettings.marketUpdates}
                      onChange={() => toggleNotification('marketUpdates')}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </motion.div>
            
            {/* Account Settings */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="bg-white rounded-xl shadow-sm p-4 mb-4 border border-gray-200"
            >
              <div className="flex items-center mb-4">
                <Settings size={20} className="text-blue-600 mr-2" />
                <h3 className="text-lg font-semibold text-gray-800">Account Settings</h3>
              </div>
              
              <div className="space-y-1">
                <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition">
                  <div className="flex items-center">
                    <Shield size={18} className="text-blue-600 mr-3" />
                    <p className="text-gray-800">Privacy Settings</p>
                  </div>
                  <ChevronRight size={18} className="text-gray-400" />
                </button>
                
                <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition">
                  <div className="flex items-center">
                    <Key size={18} className="text-blue-600 mr-3" />
                    <p className="text-gray-800">Change Password</p>
                  </div>
                  <ChevronRight size={18} className="text-gray-400" />
                </button>
                
                <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition">
                  <div className="flex items-center">
                    <LogOut size={18} className="text-red-500 mr-3" />
                    <p className="text-red-500">Log Out</p>
                  </div>
                  <ChevronRight size={18} className="text-gray-400" />
                </button>
              </div>
            </motion.div>
            
           
          </>
        )}
      </div>

      {/* Bottom Navigation */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 300, damping: 25 }}
        className="fixed bottom-0 left-0 right-0 h-16 bg-white flex items-center justify-around shadow-lg z-40"
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
                className="bg-blue-600 w-14 h-14 rounded-full flex items-center justify-center"
                onClick={() => setShowCamera(true)}
              >
                <item.icon size={24} className="text-white" />
              </motion.button>
              <span className="text-xs mt-1 font-medium text-blue-600">{item.label}</span>
            </motion.div>
          ) : (
            <Link to={item.route} key={item.id}>
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

export default AuthenticaProfile;