import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { BarChart3, TrendingUp, MessageSquare, History, ArrowRight } from 'lucide-react';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleStartAnalysis = () => {
    navigate('/select-business');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Cabeçalho */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Bem-vindo, {user?.name || 'Usuário'}
          </h1>
          <p className="mt-2 text-gray-600">
            Comece uma nova análise ou acesse suas ferramentas
          </p>
        </div>

        {/* Botão principal de ação */}
        <div className="mb-12">
          <button
            onClick={handleStartAnalysis}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Nova Análise de Funil
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>

        {/* Grid de ferramentas */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {/* Simulador de Crescimento */}
          <div
            onClick={() => navigate('/simulator')}
            className="bg-white overflow-hidden shadow rounded-lg cursor-pointer hover:shadow-md transition-shadow"
          >
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <TrendingUp className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-5">
                  <h3 className="text-lg font-medium text-gray-900">Simulador</h3>
                  <p className="text-sm text-gray-500">Calcule o impacto das melhorias</p>
                </div>
              </div>
            </div>
          </div>

          {/* Histórico de Análises */}
          <div
            onClick={() => navigate('/historical')}
            className="bg-white overflow-hidden shadow rounded-lg cursor-pointer hover:shadow-md transition-shadow"
          >
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <History className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-5">
                  <h3 className="text-lg font-medium text-gray-900">Histórico</h3>
                  <p className="text-sm text-gray-500">Veja análises anteriores</p>
                </div>
              </div>
            </div>
          </div>

          {/* Chat de Consultas */}
          <div
            onClick={() => navigate('/chat')}
            className="bg-white overflow-hidden shadow rounded-lg cursor-pointer hover:shadow-md transition-shadow"
          >
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <MessageSquare className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-5">
                  <h3 className="text-lg font-medium text-gray-900">Chat</h3>
                  <p className="text-sm text-gray-500">Tire suas dúvidas</p>
                </div>
              </div>
            </div>
          </div>

          {/* Métricas Gerais */}
          <div
            onClick={() => navigate('/metrics')}
            className="bg-white overflow-hidden shadow rounded-lg cursor-pointer hover:shadow-md transition-shadow"
          >
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <BarChart3 className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-5">
                  <h3 className="text-lg font-medium text-gray-900">Métricas</h3>
                  <p className="text-sm text-gray-500">Visão geral dos indicadores</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;