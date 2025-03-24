import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import WelcomeScreen from '../src/pages/userPages/LandingPage';
import LoginScreen from '../src/pages/userPages/LoginScreen';
import SignupScreen from '../src/pages/userPages/SignupScreen';
import ForgotPasswordScreen from '../src/pages/userPages/ForgotPassword';
import Layout from './pages/userPages/DashboardUser';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ReportSystem from './pages/userPages/DasboardComponents/Reports';
import AuthenticaApp from './pages/userPages/DasboardComponents/Products';
import DistributorDashboard from './pages/adminPages/DistributerDash';
import AuthenticaProfile from './pages/userPages/DasboardComponents/Profile';

type Screen = 'welcome' | 'login' | 'signup' | 'forgotPassword';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');

  const handleNavigate = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  return (
    <Router>
      <Routes>
        {/* Route for authenticated user dashboard */}
        <Route path="/user" element={<Layout />} />
        <Route path="/products" element={<AuthenticaApp />} />
        <Route path='/reports' element={<ReportSystem />} />
        <Route path='/profile' element={<AuthenticaProfile />} />

        {/* Route for admin dashboard */}
        <Route path='/distributer' element={<DistributorDashboard />} />
        
        <Route
          path="/"
          element={
            <div className="h-screen w-screen bg-gradient-to-b from-blue-600 to-blue-800 flex items-center justify-center p-4">
              <AnimatePresence mode="wait">
                {currentScreen === 'welcome' && (
                  <WelcomeScreen key="welcome" onNavigate={handleNavigate} />
                )}
                {currentScreen === 'login' && (
                  <LoginScreen key="login" onNavigate={handleNavigate} />
                )}
                {currentScreen === 'signup' && (
                  <SignupScreen key="signup" onNavigate={handleNavigate} />
                )}
                {currentScreen === 'forgotPassword' && (
                  <ForgotPasswordScreen key="forgotPassword" onNavigate={handleNavigate} />
                )}
              </AnimatePresence>
            </div>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
