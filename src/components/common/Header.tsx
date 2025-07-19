import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { BarChart3, LogOut, User, MessageCircle } from 'lucide-react';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-gray-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link to="/dashboard" className="flex items-center space-x-2">
            <BarChart3 className="h-8 w-8 text-blue-400" />
            <span className="text-xl font-bold">DiFunnel</span>
          </Link>

          <nav className="hidden md:flex space-x-8">
            <Link 
              to="/dashboard" 
              className="hover:text-blue-400 transition-colors"
            >
              Dashboard
            </Link>
            <Link 
              to="/analysis" 
              className="hover:text-blue-400 transition-colors"
            >
              Nova Análise
            </Link>
            <Link 
              to="/chat" 
              className="hover:text-blue-400 transition-colors flex items-center space-x-1"
            >
              <MessageCircle className="h-4 w-4" />
              <span>Chat</span>
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5" />
              <span className="hidden sm:inline">{user?.name}</span>
            </div>
            <button
              onClick={handleLogout}
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;