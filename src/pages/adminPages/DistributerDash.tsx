import React, { useState } from 'react';
import { Bell, Box, BarChart2, AlertTriangle, Package, Truck, ShoppingBag, Settings, Search, HelpCircle, LogOut, ChevronDown, User } from 'lucide-react';

const DistributorDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  // Mock data for the dashboard
  const stats = [
    { id: 1, title: 'Total Verifications', value: '12,543', trend: '+8%', color: 'bg-blue-500' },
    { id: 2, title: 'Pending Shipments', value: '47', trend: '-3%', color: 'bg-amber-500' },
    { id: 3, title: 'Verified Today', value: '1,245', trend: '+12%', color: 'bg-green-500' },
    { id: 4, title: 'Authentication Failures', value: '13', trend: '+2%', color: 'bg-red-500' }
  ];

  type VerificationStatus = 'Authentic' | 'Suspicious' | 'Pending';
  
  const recentVerifications: { id: number, product: string, manufacturer: string, batch: string, status: VerificationStatus, timestamp: string }[] = [
    { id: 1, product: 'Shoprite White Bread', manufacturer: 'Shoprite Bakery Plant', batch: 'SHB-04122', status: 'Authentic', timestamp: '10:23 AM' },
    { id: 2, product: 'Ritebrand Sunflower Oil', manufacturer: 'Willowton Group', batch: 'WLT-85214', status: 'Authentic', timestamp: '09:47 AM' },
    { id: 3, product: 'Freshmark Bananas', manufacturer: 'Freshmark Farms', batch: 'FMK-77896', status: 'Suspicious', timestamp: '09:15 AM' },
    { id: 4, product: 'Clover Full Cream Milk', manufacturer: 'Clover SA', batch: 'CLV-32145', status: 'Authentic', timestamp: '08:52 AM' },
    { id: 5, product: 'Tastic Rice 2kg', manufacturer: 'Tiger Brands', batch: 'TST-12589', status: 'Authentic', timestamp: '08:30 AM' },
];


  // Status badge component
  const StatusBadge = ({ status }: { status: 'Authentic' | 'Suspicious' | 'Pending' }) => {
    const colors = {
      'Authentic': 'bg-green-100 text-green-800',
      'Suspicious': 'bg-red-100 text-red-800',
      'Pending': 'bg-amber-100 text-amber-800'
    };
    
    return (
      <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${colors[status]}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="flex h-screen bg-gray-50 w-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white">
        <div className="p-4 flex items-center space-x-2">
          <div className="w-8 h-8 rounded-md bg-blue-500 flex items-center justify-center text-white font-bold">PA</div>
          <span className="text-lg font-semibold">ProductAuth</span>
        </div>
        
        <div className="mt-6">
          <div className="px-4 mb-2 text-xs font-semibold uppercase tracking-wider text-gray-400">Main</div>
          <a 
            href="#" 
            className={`flex items-center px-4 py-3 ${activeTab === 'dashboard' ? 'bg-blue-600' : 'hover:bg-gray-800'}`}
            onClick={() => setActiveTab('dashboard')}
          >
            <BarChart2 size={18} className="mr-3" />
            <span>Dashboard</span>
          </a>
          <a 
            href="#" 
            className={`flex items-center px-4 py-3 ${activeTab === 'verify' ? 'bg-blue-600' : 'hover:bg-gray-800'}`}
            onClick={() => setActiveTab('verify')}
          >
            <Box size={18} className="mr-3" />
            <span>Verify Products</span>
          </a>
          <a 
            href="#" 
            className={`flex items-center px-4 py-3 ${activeTab === 'shipments' ? 'bg-blue-600' : 'hover:bg-gray-800'}`}
            onClick={() => setActiveTab('shipments')}
          >
            <Truck size={18} className="mr-3" />
            <span>Shipments</span>
          </a>
          <a 
            href="#" 
            className={`flex items-center px-4 py-3 ${activeTab === 'inventory' ? 'bg-blue-600' : 'hover:bg-gray-800'}`}
            onClick={() => setActiveTab('inventory')}
          >
            <Package size={18} className="mr-3" />
            <span>Inventory</span>
          </a>
          <a 
            href="#" 
            className={`flex items-center px-4 py-3 ${activeTab === 'reports' ? 'bg-blue-600' : 'hover:bg-gray-800'}`}
            onClick={() => setActiveTab('reports')}
          >
            <AlertTriangle size={18} className="mr-3" />
            <span>Suspicious Reports</span>
          </a>
        </div>
        
        <div className="mt-6">
          <div className="px-4 mb-2 text-xs font-semibold uppercase tracking-wider text-gray-400">Account</div>
          <a href="#" className="flex items-center px-4 py-3 hover:bg-gray-800">
            <Settings size={18} className="mr-3" />
            <span>Settings</span>
          </a>
          <a href="#" className="flex items-center px-4 py-3 hover:bg-gray-800">
            <HelpCircle size={18} className="mr-3" />
            <span>Help & Support</span>
          </a>
          <a href="#" className="flex items-center px-4 py-3 hover:bg-gray-800">
            <LogOut size={18} className="mr-3" />
            <span>Logout</span>
          </a>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Top Navigation */}
        <div className="bg-white border-b flex items-center justify-between px-6 py-3 sticky top-0 z-10">
          <div className="relative">
            <Search size={18} className="absolute top-2.5 left-2.5 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search..." 
              className="pl-10 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 w-64" 
            />
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-gray-100 relative">
              <Bell size={20} />
              <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-red-500 text-xs text-white flex items-center justify-center">3</span>
            </button>
            
            <div className="flex items-center space-x-2 cursor-pointer">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                <User size={16} className="text-blue-600" />
              </div>
              <span className="text-sm font-medium">David Mthembu</span>
              <ChevronDown size={16} className="text-gray-400" />
            </div>
          </div>
        </div>
        
        {/* Dashboard Content */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Distributor Dashboard</h1>
            <div className="flex space-x-2">
              <button className="px-4 py-2 bg-white border rounded-lg text-sm hover:bg-gray-50">
                Export Data
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">
                Verify New Shipment
              </button>
            </div>
          </div>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {stats.map(stat => (
              <div key={stat.id} className="bg-white rounded-lg shadow p-4 border-l-4 border-l-blue-500">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-gray-500">{stat.title}</p>
                    <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                  </div>
                  <span className={`text-xs font-medium px-2 py-1 rounded ${stat.trend.startsWith('+') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {stat.trend}
                  </span>
                </div>
              </div>
            ))}
          </div>
          
          {/* OTP Verification Section */}
          <div className="bg-white rounded-lg shadow mb-6">
            <div className="p-4 border-b">
              <h2 className="text-lg font-semibold">Quick OTP Verification</h2>
            </div>
            <div className="p-6">
              <div className="max-w-lg mx-auto">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Enter Product OTP Code</label>
                  <div className="flex">
                    <input 
                      type="text" 
                      placeholder="e.g. PROD-12345-ABCDE" 
                      className="flex-1 border rounded-l-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700">
                      Verify
                    </button>
                  </div>
                </div>
                <div className="flex items-center space-x-4 text-sm">
                  <button className="text-blue-600 hover:underline flex items-center">
                    <Package size={16} className="mr-1" />
                    Scan Barcode
                  </button>
                  <button className="text-blue-600 hover:underline flex items-center">
                    <Box size={16} className="mr-1" />
                    Bulk Verification
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Recent Verifications */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-4 border-b flex justify-between items-center">
              <h2 className="text-lg font-semibold">Recent Verifications</h2>
              <button className="text-sm text-blue-600 hover:underline">View All</button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Product
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Manufacturer
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Batch Code
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Time
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {recentVerifications.map(item => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {item.product}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.manufacturer}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.batch}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <StatusBadge status={item.status} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.timestamp}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <button className="text-blue-600 hover:underline">Details</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DistributorDashboard;