import { motion } from 'framer-motion';
import { Home, Package, Search, FileText, User, Camera, AlertTriangle, CheckCircle, XCircle, Clock } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
// import axios from 'axios';

// Define TypeScript interfaces for our data
interface Scan {
  id: number;
  name: string;
  date: string;
  status: 'verified' | 'fake' | 'warning' | 'pending';
  productId?: number;
}

interface NavigationItem {
  special?: boolean;
  id: string;
  icon: React.ElementType;
  label: string;
  route: string;
}

const AuthenticaApp = () => {
  // State for scans and loading status
  const [recentScans, setRecentScans] = useState<Scan[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showCamera, setShowCamera] = useState<boolean>(false);
  
  // Navigation configuration
  const navigationItems: NavigationItem[] = [
      { id: 'home', icon: Home, label: 'Home', route: '/user' },
      { id: 'products', icon: Package, label: 'Products', route: '/products' },
      { id: 'scan', icon: Camera, label: 'Scan', special: true, route: '/user/scan' },
      { id: 'reports', icon: FileText, label: 'Reports', route: '/reports' },
      { id: 'profile', icon: User, label: 'Profile', route: '/profile' }
  ];

  // Use location to determine active tab
  const location = useLocation();
  const currentPath = location.pathname;
  
  // Set active tab based on current route
  const getActiveTabFromPath = (path: string): string => {
    const tabMatch = navigationItems.find(item => 
      path === item.route || path.startsWith(`${item.route}/`)
    );
    return tabMatch ? tabMatch.id : 'products';
  };
  
  const [activeTab, setActiveTab] = useState<string>(getActiveTabFromPath(currentPath));

  // API endpoint (commented out)
  // const API_BASE_URL = 'https://api.authentica.com/v1';
  
  // Fetch recent scans data - replaced with dummy data
  useEffect(() => {
    const fetchRecentScans = async () => {
      setIsLoading(true);
      try {
        // Commented out API calls
        /* const response = await axios.get(`${API_BASE_URL}/scans/recent`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
          }
        });
        
        if (response.data && response.data.scans) {
          setRecentScans(response.data.scans);
        } else {
          setRecentScans([]);
        } */
        
        // Using dummy data directly
        setTimeout(() => {
          setRecentScans([
            { id: 1, name: 'Shoprite White Bread', date: '2025-03-18', status: 'verified' },
            { id: 2, name: 'Ritebrand Sunflower Oil', date: '2025-03-17', status: 'fake' },
            { id: 3, name: 'Freshmark Bananas', date: '2025-03-16', status: 'warning' },
            { id: 4, name: 'Clover Full Cream Milk', date: '2025-03-15', status: 'pending' },
            { id: 5, name: 'Tastic Rice 2kg', date: '2025-03-14', status: 'verified' },
          ]);
          setError(null);
        }, 1000); // Adding a small delay to simulate loading
        
      } catch (err) {
        console.error('Error with dummy data:', err);
        setError('Failed to load recent scans. Please try again later.');
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      }
    };

    fetchRecentScans();
  }, []);

  // Update active tab when route changes
  useEffect(() => {
    setActiveTab(getActiveTabFromPath(currentPath));
  }, [currentPath]);

  // Get status details with appropriate icons and colors
  const getStatusDetails = (status: string) => {
    switch (status) {
      case 'verified':
        return { 
          icon: CheckCircle, 
          color: 'text-green-600', 
          bgColor: 'bg-green-50', 
          borderColor: 'border-green-200',
          label: 'Authentic'
        };
      case 'fake':
        return { 
          icon: XCircle, 
          color: 'text-red-600', 
          bgColor: 'bg-red-50', 
          borderColor: 'border-red-200',
          label: 'Counterfeit'
        };
      case 'warning':
        return { 
          icon: AlertTriangle, 
          color: 'text-yellow-600', 
          bgColor: 'bg-yellow-50', 
          borderColor: 'border-yellow-200',
          label: 'Suspicious'
        };
      case 'pending':
        return { 
          icon: Clock, 
          color: 'text-blue-600', 
          bgColor: 'bg-blue-50', 
          borderColor: 'border-blue-200',
          label: 'Pending'
        };
      default:
        return { 
          icon: Search, 
          color: 'text-gray-600', 
          bgColor: 'bg-gray-50', 
          borderColor: 'border-gray-200',
          label: 'Unknown'
        };
    }
  };

  // View scan details handler
  const viewScanDetails = (scanId: number) => {
    // Navigate to the scan details page
    window.location.href = `/scans/${scanId}`;
    console.log(`Viewing scan details for ID: ${scanId}`);
  };

  // Format date to be more readable
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 w-screen">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-800 to-blue-600 text-white p-5 shadow-lg">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-bold flex items-center justify-center">
            <span className="mr-2">Authentica</span>
           
          </h1>
          <p className="text-sm mt-1 opacity-90 text-center">Product Verification System</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 pb-20 max-w-md mx-auto">
        {/* Dashboard Summary */}
        <div className="mb-6 p-4 bg-white rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
            <Search size={18} className="mr-2 text-blue-600" />
            Verification Dashboard
          </h2>
          <div className="grid grid-cols-2 gap-2">
            <div className="p-3 bg-green-50 rounded-lg border border-green-100">
              <div className="text-2xl font-bold text-green-600">
                {recentScans.filter(scan => scan.status === 'verified').length}
              </div>
              <div className="text-xs text-green-700">Authentic Products</div>
            </div>
            <div className="p-3 bg-red-50 rounded-lg border border-red-100">
              <div className="text-2xl font-bold text-red-600">
                {recentScans.filter(scan => scan.status === 'fake').length}
              </div>
              <div className="text-xs text-red-700">Counterfeit Products</div>
            </div>
          </div>
        </div>

        {/* Recent Scans Section */}
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
            <FileText size={18} className="mr-2 text-blue-600" />
            Recent Scan Reports
          </h2>
          
          {isLoading ? (
            <div className="flex justify-center items-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-700"></div>
            </div>
          ) : error ? (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
              {error}
            </div>
          ) : recentScans.length === 0 ? (
            <div className="p-6 bg-white rounded-lg shadow-sm text-center border border-gray-200">
              <p className="text-gray-500">No recent scans found. Use the Scan button to verify a product.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {recentScans.map((scan) => {
                const statusDetails = getStatusDetails(scan.status);
                const StatusIcon = statusDetails.icon;
                return (
                  <motion.div 
                    key={scan.id} 
                    className={`flex items-center p-4 bg-white rounded-lg shadow-sm border ${statusDetails.borderColor} cursor-pointer transform transition`}
                    onClick={() => viewScanDetails(scan.id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className={`${statusDetails.bgColor} rounded-full w-10 h-10 flex items-center justify-center mr-3`}>
                      <StatusIcon size={18} className={statusDetails.color} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-800">{scan.name}</h4>
                      <p className="text-gray-500 text-xs">{formatDate(scan.date)}</p>
                    </div>
                    <div className={`${statusDetails.color} text-xs font-medium px-3 py-1 rounded-full ${statusDetails.bgColor}`}>
                      {statusDetails.label}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Scan Camera Overlay */}
      {showCamera && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-90 flex flex-col items-center justify-center z-50"
        >
          <div className="relative w-full max-w-sm h-64 bg-gray-900 rounded-lg overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-48 h-48 border-2 border-white border-opacity-50 rounded"></div>
              <div className="absolute w-48 h-1 bg-blue-500 opacity-50 animate-pulse"></div>
            </div>
            <div className="absolute top-4 left-4 right-4 text-white text-center">
              <p className="text-sm">Position the product barcode within the box</p>
            </div>
          </div>
          <button 
            className="mt-6 bg-white text-blue-800 px-6 py-2 rounded-full font-medium"
            onClick={() => setShowCamera(false)}
          >
            Cancel
          </button>
        </motion.div>
      )}

      {/* Bottom Navigation */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 300, damping: 25 }}
        className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-gray-200 flex items-center justify-around px-4 shadow-lg z-40"
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

export default AuthenticaApp;