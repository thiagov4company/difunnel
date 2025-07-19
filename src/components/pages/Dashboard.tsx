import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useData } from '../../contexts/DataContext';
import Header from '../common/Header';
import { 
  Plus, 
  BarChart3, 
  TrendingUp, 
  Target, 
  Calendar,
  ArrowRight,
  ShoppingCart,
  Users,
  MessageSquare
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { funnels } = useData();

  const getBusinessModelIcon = (model: string) => {
    switch (model) {
      case 'ecommerce-low':
      case 'ecommerce-high':
        return <ShoppingCart className="h-5 w-5" />;
      case 'inside-sales-b2b':
      case 'inside-sales-b2c':
        return <Users className="h-5 w-5" />;
      case 'pdv':
        return <Target className="h-5 w-5" />;
      default:
        return <BarChart3 className="h-5 w-5" />;
    }
  };

  const getBusinessModelName = (model: string) => {
    switch (model) {
      case 'ecommerce-low':
        return 'E-commerce Low Ticket';
      case 'ecommerce-high':
        return 'E-commerce High Ticket';
      case 'inside-sales-b2b':
        return 'Inside Sales B2B';
      case 'inside-sales-b2c':
        return 'Inside Sales B2C';
      case 'pdv':
        return 'PDV (Ponto de Venda)';
      default:
        return 'Modelo de Negócio';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Bem-vindo, {user?.name}!
          </h1>
          <p className="text-gray-600 mt-2">
            Analise seus funis de vendas e identifique oportunidades de crescimento
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Funis Analisados</p>
                <p className="text-2xl font-semibold text-gray-900">{funnels.length}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <BarChart3 className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Melhoria Média</p>
                <p className="text-2xl font-semibold text-green-600">+32%</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Gargalos Identificados</p>
                <p className="text-2xl font-semibold text-red-600">
                  {funnels.reduce((acc, funnel) => acc + (funnel.results?.recommendations.length || 0), 0)}
                </p>
              </div>
              <div className="p-3 bg-red-100 rounded-full">
                <Target className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Último Acesso</p>
                <p className="text-2xl font-semibold text-gray-900">Hoje</p>
              </div>
              <div className="p-3 bg-gray-100 rounded-full">
                <Calendar className="h-6 w-6 text-gray-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Link
            to="/analysis"
            className="group bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-lg text-white hover:from-blue-600 hover:to-blue-700 transition-all duration-200 transform hover:scale-105"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Nova Análise</h3>
                <p className="text-blue-100 text-sm mt-1">
                  Analise um novo funil de vendas
                </p>
              </div>
              <div className="p-3 bg-white/20 rounded-full group-hover:bg-white/30 transition-colors">
                <Plus className="h-6 w-6" />
              </div>
            </div>
          </Link>

          <Link
            to="/chat"
            className="group bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-lg text-white hover:from-green-600 hover:to-green-700 transition-all duration-200 transform hover:scale-105"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Chat Consulta</h3>
                <p className="text-green-100 text-sm mt-1">
                  Consultas rápidas sobre métricas
                </p>
              </div>
              <div className="p-3 bg-white/20 rounded-full group-hover:bg-white/30 transition-colors">
                <MessageSquare className="h-6 w-6" />
              </div>
            </div>
          </Link>

          <div className="group bg-gradient-to-r from-purple-500 to-purple-600 p-6 rounded-lg text-white cursor-pointer hover:from-purple-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Relatório PDF</h3>
                <p className="text-purple-100 text-sm mt-1">
                  Gere relatórios profissionais
                </p>
              </div>
              <div className="p-3 bg-white/20 rounded-full group-hover:bg-white/30 transition-colors">
                <TrendingUp className="h-6 w-6" />
              </div>
            </div>
          </div>
        </div>

        {/* Recent Analyses */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">
                Análises Recentes
              </h2>
              <Link
                to="/analysis"
                className="text-blue-600 hover:text-blue-700 flex items-center space-x-1"
              >
                <span>Nova análise</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="p-6">
            {funnels.length === 0 ? (
              <div className="text-center py-12">
                <BarChart3 className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Nenhuma análise ainda
                </h3>
                <p className="text-gray-600 mb-6">
                  Comece analisando seu primeiro funil de vendas
                </p>
                <Link
                  to="/analysis"
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center space-x-2"
                >
                  <Plus className="h-5 w-5" />
                  <span>Criar primeira análise</span>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {funnels.map((funnel) => (
                  <div
                    key={funnel.id}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-blue-100 rounded-full">
                        {getBusinessModelIcon(funnel.businessModel)}
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {getBusinessModelName(funnel.businessModel)}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {funnel.sector} • {funnel.updatedAt.toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      {funnel.results && (
                        <div className="text-sm text-gray-600">
                          {funnel.results.recommendations.length} recomendações
                        </div>
                      )}
                      <button className="text-blue-600 hover:text-blue-700">
                        <ArrowRight className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;