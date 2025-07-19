import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BarChart3, 
  Target, 
  TrendingUp, 
  Users, 
  CheckCircle, 
  ArrowRight,
  Zap,
  Shield,
  Clock
} from 'lucide-react';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      {/* Header */}
      <header className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-2">
              <BarChart3 className="h-8 w-8 text-blue-400" />
              <span className="text-xl font-bold text-white">DiFunnel</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link 
                to="/login" 
                className="text-white hover:text-blue-400 transition-colors"
              >
                Login
              </Link>
              <Link 
                to="/signup" 
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Começar Grátis
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-16 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Identifique os 
            <span className="text-blue-400"> Gargalos</span> do 
            <br />Seu Funil de Vendas
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Analise seu funil de vendas com base em benchmarks reais do mercado brasileiro. 
            Receba diagnósticos precisos e planos de ação para aumentar suas conversões.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/signup" 
              className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors text-lg font-semibold flex items-center justify-center space-x-2"
            >
              <span>Analisar Meu Funil</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
            <button className="border border-white text-white px-8 py-4 rounded-lg hover:bg-white hover:text-gray-900 transition-colors text-lg font-semibold">
              Ver Demonstração
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Por que o DiFunnel é diferente?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Não é apenas mais uma ferramenta de análise. É seu consultor de funil automatizado.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <Target className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Benchmark Dinâmico
              </h3>
              <p className="text-gray-600">
                Compare seus resultados com médias reais do mercado brasileiro por setor, 
                ticket médio e canal de aquisição.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Simulador de Crescimento
              </h3>
              <p className="text-gray-600">
                Veja exatamente quanto sua empresa lucraria se cada etapa do funil 
                melhorasse percentualmente.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Recomendações Personalizadas
              </h3>
              <p className="text-gray-600">
                Sugestões diferentes para empresas iniciantes vs. quem já fatura 6 dígitos, 
                baseadas no nível de maturidade.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Relatórios Profissionais em PDF
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Gere relatórios visuais completos com diagnóstico, recomendações e plano de ação. 
                Perfeito para apresentar para stakeholders ou clientes.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">Análise completa do funil</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">Comparativo com benchmarks</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">Plano de ação detalhado</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">Projeção de crescimento</span>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-xl">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Relatório de Análise</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Taxa de Conversão</span>
                    <span className="text-sm font-semibold text-red-600">0.8% (Abaixo)</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">CAC</span>
                    <span className="text-sm font-semibold text-green-600">R$ 45 (Ótimo)</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">ROAS</span>
                    <span className="text-sm font-semibold text-yellow-600">3.2x (Aceitável)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12">
            Trusted by Growing Companies
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Zap className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">500+</h3>
              <p className="text-gray-600">Empresas analisadas</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">32%</h3>
              <p className="text-gray-600">Aumento médio nas conversões</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <Clock className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">5 min</h3>
              <p className="text-gray-600">Para análise completa</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Pronto para otimizar seu funil?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Comece sua análise gratuita agora e descubra onde estão os gargalos 
            que estão impedindo seu crescimento.
          </p>
          <Link 
            to="/signup" 
            className="bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors text-lg font-semibold inline-flex items-center space-x-2"
          >
            <span>Começar Análise Gratuita</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <BarChart3 className="h-6 w-6 text-blue-400" />
                <span className="text-lg font-bold">DiFunnel</span>
              </div>
              <p className="text-gray-400">
                Seu consultor de funil automatizado para identificar gargalos e acelerar crescimento.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Produto</h3>
              <div className="space-y-2">
                <div className="text-gray-400 hover:text-white cursor-pointer">Análise de Funil</div>
                <div className="text-gray-400 hover:text-white cursor-pointer">Benchmarks</div>
                <div className="text-gray-400 hover:text-white cursor-pointer">Relatórios</div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Empresa</h3>
              <div className="space-y-2">
                <div className="text-gray-400 hover:text-white cursor-pointer">Sobre</div>
                <div className="text-gray-400 hover:text-white cursor-pointer">Blog</div>
                <div className="text-gray-400 hover:text-white cursor-pointer">Contato</div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Suporte</h3>
              <div className="space-y-2">
                <div className="text-gray-400 hover:text-white cursor-pointer">Ajuda</div>
                <div className="text-gray-400 hover:text-white cursor-pointer">Documentação</div>
                <div className="text-gray-400 hover:text-white cursor-pointer">Status</div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 DiFunnel. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;