import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { DataProvider } from './contexts/DataContext';
import LandingPage from './components/pages/LandingPage';
import LoginPage from './components/pages/LoginPage';
import SignUpPage from './components/pages/SignUpPage';
import Dashboard from './components/pages/Dashboard';
import BusinessTypeSelection from './components/pages/BusinessTypeSelection';
import EcommerceAnalysis from './components/pages/analysis/EcommerceAnalysis';
import InsideSalesB2C from './components/pages/analysis/InsideSalesB2C';
import InsideSalesB2B from './components/pages/analysis/InsideSalesB2B';
import PDVAnalysis from './components/pages/analysis/PDVAnalysis';
import GrowthSimulator from './components/pages/GrowthSimulator';
import HistoricalDashboard from './components/pages/HistoricalDashboard';
import ChatConsultation from './components/pages/ChatConsultation';
import ProtectedRoute from './components/common/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Routes>
              {/* Rotas públicas */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              
              {/* Rotas protegidas */}
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              
              <Route path="/select-business" element={
                <ProtectedRoute>
                  <BusinessTypeSelection />
                </ProtectedRoute>
              } />

              {/* Rotas de análise por tipo de negócio */}
              <Route path="/analysis/ecommerce" element={
                <ProtectedRoute>
                  <EcommerceAnalysis />
                </ProtectedRoute>
              } />
              
              <Route path="/analysis/inside-sales-b2c" element={
                <ProtectedRoute>
                  <InsideSalesB2C />
                </ProtectedRoute>
              } />
              
              <Route path="/analysis/inside-sales-b2b" element={
                <ProtectedRoute>
                  <InsideSalesB2B />
                </ProtectedRoute>
              } />
              
              <Route path="/analysis/pdv" element={
                <ProtectedRoute>
                  <PDVAnalysis />
                </ProtectedRoute>
              } />

              {/* Ferramentas e recursos */}
              <Route path="/simulator" element={
                <ProtectedRoute>
                  <GrowthSimulator />
                </ProtectedRoute>
              } />
              
              <Route path="/historical" element={
                <ProtectedRoute>
                  <HistoricalDashboard />
                </ProtectedRoute>
              } />
              
              <Route path="/chat" element={
                <ProtectedRoute>
                  <ChatConsultation />
                </ProtectedRoute>
              } />
            </Routes>
          </div>
        </Router>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;