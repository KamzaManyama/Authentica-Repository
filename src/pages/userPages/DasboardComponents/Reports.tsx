import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FileText, Camera, Edit, Home, Package, Search, User, ChevronRight, Upload, X, CheckCircle, Clock, AlertTriangle, Bell, Menu, Shield, ArrowLeft } from 'lucide-react';

const ReportSystem = () => {
  // Report initiation states
  
  const [activeTab, setActiveTab] = useState('reports');
  const [storeName, setStoreName] = useState('');
  const [location, setLocation] = useState('');
  const [issueType, setIssueType] = useState('');
  const [description, setDescription] = useState('');
  const [purchaseInfo, setPurchaseInfo] = useState('');
  const [photos, setPhotos] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  

  // Report management states
  interface Report {
    id: number;
    storeName: string;
    location: string;
    issueType: string;
    description: string;
    purchaseInfo: string;
    photos: File[];
    status: string;
    date: string;
  }

  const [reports, setReports] = useState<Report[]>([]);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [reportStatus, setReportStatus] = useState('');
  const [viewReports, setViewReports] = useState(false);
  const [filter, setFilter] = useState('all');

  // Issue types for selection
  const issueTypes = ['Counterfeit', 'Expired', 'Damaged', 'Packaging Issue', 'Quality Problem'];

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files) as File[];
      setPhotos([...photos, ...newFiles]);
    }
  };

  const removePhoto = (index: number) => {
    const updatedPhotos = [...photos];
    updatedPhotos.splice(index, 1);
    setPhotos(updatedPhotos);
  };

  const navigationItems = [
    { id: 'home', icon: Home, label: 'Home', route: '/user' },
    { id: 'products', icon: Package, label: 'Products', route: '/products' },
    { id: 'scan', icon: Search, label: 'Scan', special: true, route: '/user/scan' },
    { id: 'reports', icon: FileText, label: 'Reports', route: '/reports' },
    { id: 'profile', icon: User, label: 'Profile', route: '/profile' }
  ];

  const handleSubmitReport = () => {
    setIsSubmitting(true);
    
    // Simulating API call with timeout
    setTimeout(() => {
      const newReport = {
        id: Date.now(),
        storeName,
        location,
        issueType,
        description,
        purchaseInfo,
        photos,
        status: 'Submitted',
        date: new Date().toLocaleDateString()
      };
      setReports([...reports, newReport]);
      resetForm();
      setIsSubmitting(false);
      setSubmissionSuccess(true);
      
      // Reset success message after 3 seconds
      setTimeout(() => {
        setSubmissionSuccess(false);
        setCurrentStep(1);
      }, 3000);
    }, 1500);
  };

  const resetForm = () => {
    setStoreName('');
    setLocation('');
    setIssueType('');
    setDescription('');
    setPurchaseInfo('');
    setPhotos([]);
  };

  const handleReportManagement = (id: any) => {
    const report = reports.find((r) => r.id === id);
    setSelectedReport(report || null);
    setReportStatus(report?.status || '');
  };
 
  const handleUpdateReport = (updatedStatus: string) => {
    if (selectedReport) {
      const updatedReport = { ...selectedReport, status: updatedStatus };
      const updatedReports = reports.map((report) =>
        report.id === selectedReport.id ? updatedReport : report
      );
      setReports(updatedReports);
      setReportStatus(updatedStatus as string);
      setSelectedReport(updatedReport);
    }
  };

  const toggleViewReports = () => {
    setViewReports(!viewReports);
    setSelectedReport(null);
  };

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmitReport();
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getStatusColor = (status: any) => {
    switch (status) {
      case 'Submitted':
        return 'bg-blue-100 text-blue-800';
      case 'In Progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'Resolved':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: any) => {
    switch (status) {
      case 'Submitted':
        return <FileText size={14} className="mr-1" />;
      case 'In Progress':
        return <Clock size={14} className="mr-1" />;
      case 'Resolved':
        return <CheckCircle size={14} className="mr-1" />;
      default:
        return <AlertTriangle size={14} className="mr-1" />;
    }
  };

  const filteredReports = filter === 'all' 
    ? reports 
    : reports.filter(report => report.status.toLowerCase() === filter.toLowerCase());

  const isStepComplete = () => {
    switch (currentStep) {
      case 1:
        return storeName && location && issueType;
      case 2:
        return description && purchaseInfo;
      case 3:
        return true; // Photos are optional
      default:
        return false;
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen w-screen">
      {/* Header */}
      <header className="bg-blue-700 text-white shadow-md fixed top-0 left-0 right-0 z-50">
  <div className="max-w-lg mx-auto text-center py-4">
    {viewReports && selectedReport ? (
      <button 
        onClick={() => setSelectedReport(null)}
        className="flex items-center text-white font-medium hover:text-gray-200 transition mx-auto"
      >
        <ArrowLeft size={20} className="mr-2" />
        Back to Reports
      </button>
    ) : (
      <>
        <h1 className="text-2xl font-bold">Authentica</h1>
        <p className="text-sm mt-1">Verification Reports Dashboard</p>
      </>
    )}
  </div>
</header>



      {/* Main Content */}
      <div className="max-w-lg mx-auto px-4 pt-28 pb-24">
        <AnimatePresence mode="wait">
          {submissionSuccess ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-green-50 p-6 rounded-lg shadow-md text-center my-8"
            >
              <CheckCircle size={48} className="text-green-500 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-green-800">Report Submitted Successfully</h2>
              <p className="text-green-700 mt-2">Thank you for your report. Our team will review it shortly.</p>
            </motion.div>
          ) : (
            <div>
              <div className="flex items-center justify-between mb-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={toggleViewReports}
                  className="text-sm font-medium text-blue-600 flex items-center"
                >
                  {viewReports ? "New Report" : "View Reports"}
                  <ChevronRight size={16} />
                </motion.button>
              </div>
              
              {!viewReports && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-lg shadow-sm p-6"
                >
                  {/* Stepper */}
                  <div className="flex justify-between items-center mb-8">
                    {[1, 2, 3].map((step) => (
                      <div key={step} className="flex flex-col items-center">
                        <div 
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold
                            ${currentStep === step ? 'bg-blue-600 text-white' : 
                            currentStep > step ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600'}`}
                        >
                          {currentStep > step ? <CheckCircle size={16} /> : step}
                        </div>
                        <span className="text-xs mt-1 text-gray-500">
                          {step === 1 ? 'Details' : step === 2 ? 'Description' : 'Photos'}
                        </span>
                      </div>
                    ))}
                  </div>
                  
                  {/* Form Steps */}
                  <AnimatePresence mode="wait">
                    {currentStep === 1 && (
                      <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="space-y-4"
                      >
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Store Name</label>
                          <input
                            type="text"
                            value={storeName}
                            onChange={(e) => setStoreName(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                            placeholder="Enter store name"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Store Location</label>
                          <input
                            type="text"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                            placeholder="Enter store location"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Issue Type</label>
                          <select
                            value={issueType}
                            onChange={(e) => setIssueType(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition appearance-none bg-white"
                          >
                            <option value="">Select an issue type</option>
                            {issueTypes.map((type) => (
                              <option key={type} value={type}>
                                {type}
                              </option>
                            ))}
                          </select>
                        </div>
                      </motion.div>
                    )}
                    
                    {currentStep === 2 && (
                      <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="space-y-4"
                      >
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                          <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                            rows={4}
                            placeholder="Describe the issue in detail"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Purchase Information</label>
                          <input
                            type="text"
                            value={purchaseInfo}
                            onChange={(e) => setPurchaseInfo(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                            placeholder="Date of purchase, receipt number, etc."
                          />
                        </div>
                      </motion.div>
                    )}
                    
                    {currentStep === 3 && (
                      <motion.div
                        key="step3"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="space-y-4"
                      >
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Add Photos</label>
                          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-blue-500 transition">
                            <input
                              type="file"
                              id="photo-upload"
                              accept="image/*"
                              multiple
                              onChange={handleFileChange}
                              className="hidden"
                            />
                            <label htmlFor="photo-upload" className="cursor-pointer">
                              <Upload size={24} className="mx-auto text-gray-400 mb-2" />
                              <p className="text-sm text-gray-600">Click to upload photos</p>
                              <p className="text-xs text-gray-500 mt-1">or drag and drop</p>
                            </label>
                          </div>
                        </div>
                        
                        {photos.length > 0 && (
                          <div className="mt-4">
                            <p className="text-sm font-medium text-gray-700 mb-2">Uploaded Photos ({photos.length})</p>
                            <div className="grid grid-cols-3 gap-2">
                              {photos.map((photo, index) => (
                                <div key={index} className="relative">
                                  <img 
                                    src={URL.createObjectURL(photo)} 
                                    alt={`Uploaded ${index}`} 
                                    className="w-full h-24 object-cover rounded-md"
                                  />
                                  <button
                                    onClick={() => removePhoto(index)}
                                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 w-6 h-6 flex items-center justify-center"
                                  >
                                    <X size={12} />
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                  {/* Form Navigation */}
                  <div className="flex justify-between mt-8">
                    {currentStep > 1 ? (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={prevStep}
                        className="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 font-medium"
                      >
                        Back
                      </motion.button>
                    ) : (
                      <div></div>
                    )}
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={nextStep}
                      disabled={!isStepComplete() || isSubmitting}
                      className={`px-6 py-2 rounded-lg text-white font-medium flex items-center
                        ${isStepComplete() ? 'bg-blue-600' : 'bg-gray-400 cursor-not-allowed'}`}
                    >
                      {isSubmitting ? (
                        <div className="flex items-center">
                          <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                          Submitting...
                        </div>
                      ) : (
                        <>
                          {currentStep === 3 ? 'Submit Report' : 'Continue'}
                          <ChevronRight size={16} className="ml-1" />
                        </>
                      )}
                    </motion.button>
                  </div>
                </motion.div>
              )}
              
              {/* Reports List */}
              {viewReports && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {/* Filters */}
                  <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
                    <div className="flex gap-2 overflow-x-auto pb-2">
                      <button
                        onClick={() => setFilter('all')}
                        className={`px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap
                          ${filter === 'all' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}
                      >
                        All
                      </button>
                      <button
                        onClick={() => setFilter('submitted')}
                        className={`px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap
                          ${filter === 'submitted' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}
                      >
                        Submitted
                      </button>
                      <button
                        onClick={() => setFilter('in progress')}
                        className={`px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap
                          ${filter === 'in progress' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}
                      >
                        In Progress
                      </button>
                      <button
                        onClick={() => setFilter('resolved')}
                        className={`px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap
                          ${filter === 'resolved' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}
                      >
                        Resolved
                      </button>
                    </div>
                  </div>
                  
                  {filteredReports.length === 0 ? (
                    <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                      <FileText size={40} className="mx-auto text-gray-300 mb-4" />
                      <p className="text-gray-500">No reports found</p>
                      {filter !== 'all' && (
                        <p className="text-sm text-gray-400 mt-1">Try changing your filter</p>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {filteredReports.map((report) => (
                        <motion.div
                          key={report.id}
                          whileHover={{ scale: 1.01 }}
                          className={`bg-white border rounded-lg p-4 cursor-pointer ${selectedReport?.id === report.id ? 'ring-2 ring-blue-500' : ''}`}
                          onClick={() => handleReportManagement(report.id)}
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-semibold">{report.issueType}</h3>
                              <p className="text-sm text-gray-500">{report.storeName}, {report.location}</p>
                            </div>
                            <div className={`px-2 py-1 rounded-full text-xs font-medium flex items-center ${getStatusColor(report.status)}`}>
                              {getStatusIcon(report.status)}
                              {report.status}
                            </div>
                          </div>
                          <p className="text-xs text-gray-400 mt-2">Submitted on {report.date}</p>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}
              
              {/* Report Details */}
              {selectedReport && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-lg shadow-sm p-6 mt-4"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Report Details</h3>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium flex items-center ${getStatusColor(selectedReport.status)}`}>
                      {getStatusIcon(selectedReport.status)}
                      {selectedReport.status}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-gray-500">Store Name</p>
                      <p className="font-medium">{selectedReport.storeName}</p>
                    </div>
                    
                    <div>
                      <p className="text-xs text-gray-500">Store Location</p>
                      <p className="font-medium">{selectedReport.location}</p>
                    </div>
                    
                    <div>
                      <p className="text-xs text-gray-500">Issue Type</p>
                      <p className="font-medium">{selectedReport.issueType}</p>
                    </div>
                    
                    <div>
                      <p className="text-xs text-gray-500">Purchase Info</p>
                      <p className="font-medium">{selectedReport.purchaseInfo}</p>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-xs text-gray-500">Description</p>
                    <p className="text-sm mt-1">{selectedReport.description}</p>
                  </div>
                  
                  {selectedReport.photos.length > 0 && (
                    <div className="mb-4">
                      <p className="text-xs text-gray-500 mb-2">Photos</p>
                      <div className="grid grid-cols-3 gap-2">
                        {selectedReport.photos.map((photo: Blob | MediaSource, index: React.Key | null | undefined) => (
                          <img 
                            key={index} 
                            src={URL.createObjectURL(photo)} 
                            alt={`Report Photo ${index}`} 
                            className="w-full h-24 object-cover rounded-md"
                          />
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {selectedReport.status !== 'Resolved' && (
                    <div className="mt-4 flex space-x-2">
                      {selectedReport.status === 'Submitted' && (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleUpdateReport('In Progress')}
                          className="flex-1 bg-yellow-500 text-white p-2 rounded-lg font-medium"
                        >
                          Mark as In Progress
                        </motion.button>
                      )}
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleUpdateReport('Resolved')}
                        className="flex-1 bg-green-500 text-white p-2 rounded-lg font-medium"
                      >
                        Mark as Resolved
                      </motion.button>
                    </div>
                  )}
                </motion.div>
              )}
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Menu Overlay */}
      <AnimatePresence>
        {showMenu && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50"
            onClick={() => setShowMenu(false)}
          >
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              className="absolute top-0 left-0 h-full w-64 bg-white shadow-lg p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center mb-6 pb-4 border-b border-gray-100">
                <Shield size={24} className="text-blue-600 mr-2" />
                <span className="font-bold text-xl text-gray-800">Authentica</span>
              </div>
              
              <div className="space-y-4">
                {navigationItems.map((item) => (
                  <div key={item.id} className="flex items-center px-2 py-2 rounded-lg hover:bg-gray-100 cursor-pointer">
                    <item.icon size={20} className="text-gray-600 mr-3" />
                    <span className="text-gray-800">{item.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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

export default ReportSystem;