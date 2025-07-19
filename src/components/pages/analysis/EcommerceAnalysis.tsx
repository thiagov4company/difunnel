import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ShoppingCart, 
  ArrowRight, 
  DollarSign, 
  Users, 
  ShoppingBag, 
  CreditCard,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Target,
  Image,
  Video,
  Grid,
  RefreshCw
} from 'lucide-react';

interface FacebookMetrics {
  staticCTR: number;
  videoCTR: number;
  catalogCTR: number;
  frequency: number;
  creativesPerAudience: number;
  spend: number;
  clicks: number;
}

interface GoogleMetrics {
  cpc: number;
  ctr: number;
  spend: number;
  clicks: number;
}

interface MetricsForm {
  // Métricas do funil
  visitors: number;
  addToCart: number;
  startedCheckout: number;
  purchases: number;
  averageTicket: number;
  
  // Métricas do Facebook
  facebook: FacebookMetrics;
  
  // Métricas do Google
  google: GoogleMetrics;
}

interface Problem {
  id: number;
  title: string;
  description: string;
  solution: string;
  category: 'product' | 'campaign' | 'creative' | 'audience' | 'technical';
  severity: 'high' | 'medium' | 'low';
}

const ECOMMERCE_PROBLEMS: Problem[] = [
  {
    id: 1,
    title: 'Produto não corresponde ao canal',
    description: 'Produto de Intenção no Facebook ou Produto de Necessidade no Google',
    solution: 'Definir os produtos de Intenção para o Facebook e Necessidade para o Google',
    category: 'product',
    severity: 'high'
  },
  {
    id: 2,
    title: 'Objetivo de Campanha Incorreto',
    description: 'Objetivo não alinhado com a estratégia de aquisição/monetização',
    solution: 'Definir objetivos específicos para cada etapa do funil',
    category: 'campaign',
    severity: 'high'
  },
  {
    id: 3,
    title: 'Funil mal definido',
    description: 'Estratégia de funil não clara ou mal estruturada',
    solution: 'Utilizar estratégia de Topo de Funil para aquisição e Monetização para público existente',
    category: 'campaign',
    severity: 'high'
  },
  {
    id: 4,
    title: 'Oferta Não Atrativa',
    description: 'Proposta de valor fraca ou pouco competitiva',
    solution: 'Gerar mais valor na oferta (Frete Grátis, Desconto, Brinde, Kit)',
    category: 'product',
    severity: 'high'
  },
  {
    id: 5,
    title: 'Criativos Insuficientes',
    description: 'Menos de 3 criativos por público',
    solution: 'Testar no mínimo 4 criativos por conjunto de anúncio',
    category: 'creative',
    severity: 'medium'
  },
  {
    id: 6,
    title: 'Copy Inadequada',
    description: 'Textos sem gatilhos mentais efetivos',
    solution: 'Trazer novas copys utilizando gatilhos de Autoridade, Benefício e Escassez',
    category: 'creative',
    severity: 'medium'
  },
  {
    id: 7,
    title: 'Frequência Alta',
    description: 'Frequência maior que 3 nos últimos 7 dias',
    solution: 'Ajustar frequência e trazer novos públicos para topo e meio de funil',
    category: 'audience',
    severity: 'high'
  },
  {
    id: 8,
    title: 'Excesso de Remarketing',
    description: 'Muitas campanhas de remarketing em relação ao topo de funil',
    solution: 'Equilibrar investimento entre topo, meio e fundo de funil',
    category: 'campaign',
    severity: 'medium'
  },
  {
    id: 9,
    title: 'Performance da Landing Page',
    description: 'Taxa de carregamento da página afetando conversões',
    solution: 'Analisar e otimizar taxa de carregamento da página de destino',
    category: 'technical',
    severity: 'high'
  }
];

const BENCHMARK_METRICS = {
  facebook: {
    staticCTR: 0.8,
    videoCTR: 0.8,
    catalogCTR: 1.2,
    maxFrequency: 4,
    minCreativesPerAudience: 3,
    targetCPC: 1
  },
  google: {
    ctr: 3,
    targetCPC: 2
  }
};

const EcommerceAnalysis: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<'ticket' | 'metrics' | 'campaigns' | 'analysis'>('ticket');
  const [ticketType, setTicketType] = useState<'low' | 'high' | null>(null);
  const [metrics, setMetrics] = useState<MetricsForm>({
    visitors: 0,
    addToCart: 0,
    startedCheckout: 0,
    purchases: 0,
    averageTicket: 0,
    facebook: {
      staticCTR: 0,
      videoCTR: 0,
      catalogCTR: 0,
      frequency: 0,
      creativesPerAudience: 0,
      spend: 0,
      clicks: 0
    },
    google: {
      cpc: 0,
      ctr: 0,
      spend: 0,
      clicks: 0
    }
  });

  const handleTicketSelect = (type: 'low' | 'high') => {
    setTicketType(type);
    setStep('metrics');
  };

  const handleMetricsChange = (field: keyof MetricsForm, value: string) => {
    setMetrics(prev => ({
      ...prev,
      [field]: Number(value) || 0
    }));
  };

  const handleMetricsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('campaigns');
  };

  const handleCampaignsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('analysis');
  };

  const calculateConversionRate = (numerator: number, denominator: number): string => {
    if (!denominator) return '0%';
    return ((numerator / denominator) * 100).toFixed(2) + '%';
  };

  const calculateCAC = (): number => {
    if (!metrics.purchases) return 0;
    return metrics.facebook.spend / metrics.purchases;
  };

  const calculateROAS = (): number => {
    if (!metrics.facebook.spend) return 0;
    return (metrics.purchases * metrics.averageTicket) / metrics.facebook.spend;
  };

  const getBenchmarks = (): { metric: string, current: number, benchmark: number, status: 'success' | 'warning' | 'danger' }[] => {
    const isLowTicket = ticketType === 'low';
    return [
      {
        metric: 'Taxa de Adição ao Carrinho',
        current: (metrics.addToCart / metrics.visitors) * 100,
        benchmark: isLowTicket ? 8.5 : 5.2,
        status: (metrics.addToCart / metrics.visitors) * 100 >= (isLowTicket ? 8.5 : 5.2) ? 'success' : 'warning'
      },
      {
        metric: 'Taxa de Checkout',
        current: (metrics.startedCheckout / metrics.addToCart) * 100,
        benchmark: isLowTicket ? 35 : 40,
        status: (metrics.startedCheckout / metrics.addToCart) * 100 >= (isLowTicket ? 35 : 40) ? 'success' : 'warning'
      },
      {
        metric: 'Taxa de Conversão',
        current: (metrics.purchases / metrics.visitors) * 100,
        benchmark: isLowTicket ? 1.5 : 0.8,
        status: (metrics.purchases / metrics.visitors) * 100 >= (isLowTicket ? 1.5 : 0.8) ? 'success' : 'warning'
      },
      {
        metric: 'ROAS',
        current: calculateROAS(),
        benchmark: isLowTicket ? 3 : 4,
        status: calculateROAS() >= (isLowTicket ? 3 : 4) ? 'success' : 'danger'
      }
    ];
  };

  const getSuggestions = (): { title: string, description: string, impact: 'high' | 'medium' | 'low', stage: 'awareness' | 'consideration' | 'conversion' }[] => {
    const benchmarks = getBenchmarks();
    const suggestions: { title: string, description: string, impact: 'high' | 'medium' | 'low', stage: 'awareness' | 'consideration' | 'conversion' }[] = [];

    // Sugestões baseadas nas métricas do funil
    if (benchmarks[0].status !== 'success') {
      suggestions.push({
        title: 'Otimização da Página de Produto',
        description: 'Melhorar fotos dos produtos, adicionar vídeos e reviews para aumentar confiança',
        impact: 'high',
        stage: 'consideration'
      });
    }

    if (benchmarks[1].status !== 'success') {
      suggestions.push({
        title: 'Otimização do Carrinho',
        description: 'Implementar recuperação de carrinho abandonado e simplificar processo de checkout',
        impact: 'high',
        stage: 'conversion'
      });
    }

    // Sugestões baseadas nas métricas de campanhas
    if (calculateROAS() < (ticketType === 'low' ? 3 : 4)) {
      suggestions.push({
        title: 'Otimização de Campanhas',
        description: 'Revisar segmentação e criativos das campanhas para melhorar ROAS',
        impact: 'high',
        stage: 'awareness'
      });
    }

    const ctr = (metrics.facebook.clicks / metrics.facebook.impressions) * 100;
    if (ctr < 2) {
      suggestions.push({
        title: 'Melhorar CTR dos Anúncios',
        description: 'Testar novos títulos e imagens para aumentar taxa de clique',
        impact: 'medium',
        stage: 'awareness'
      });
    }

    return suggestions;
  };

  const analyzeProblems = (): Problem[] => {
    const problems: Problem[] = [];
    
    // Verifica CTR do Facebook por formato
    if (metrics.facebook.staticCTR < BENCHMARK_METRICS.facebook.staticCTR) {
      problems.push(ECOMMERCE_PROBLEMS.find(p => p.category === 'creative') || ECOMMERCE_PROBLEMS[4]);
    }
    if (metrics.facebook.videoCTR < BENCHMARK_METRICS.facebook.videoCTR) {
      problems.push(ECOMMERCE_PROBLEMS.find(p => p.category === 'creative') || ECOMMERCE_PROBLEMS[4]);
    }
    if (metrics.facebook.catalogCTR < BENCHMARK_METRICS.facebook.catalogCTR) {
      problems.push(ECOMMERCE_PROBLEMS.find(p => p.category === 'creative') || ECOMMERCE_PROBLEMS[4]);
    }

    // Verifica frequência
    if (metrics.facebook.frequency > BENCHMARK_METRICS.facebook.maxFrequency) {
      problems.push(ECOMMERCE_PROBLEMS.find(p => p.title.includes('Frequência')) || ECOMMERCE_PROBLEMS[6]);
    }

    // Verifica quantidade de criativos
    if (metrics.facebook.creativesPerAudience < BENCHMARK_METRICS.facebook.minCreativesPerAudience) {
      problems.push(ECOMMERCE_PROBLEMS.find(p => p.title.includes('Criativos')) || ECOMMERCE_PROBLEMS[4]);
    }

    // Verifica CTR do Google
    if (metrics.google.ctr < BENCHMARK_METRICS.google.ctr) {
      problems.push(ECOMMERCE_PROBLEMS.find(p => p.category === 'campaign') || ECOMMERCE_PROBLEMS[1]);
    }

    return problems;
  };

  const renderTicketSelection = () => (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Selecione o Ticket Médio do seu E-commerce
      </h2>
      <div className="grid md:grid-cols-2 gap-6">
        <div
          onClick={() => handleTicketSelect('low')}
          className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${
            ticketType === 'low'
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-200 hover:border-blue-300'
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <DollarSign className="h-8 w-8 text-blue-500" />
            <span className="text-sm font-medium text-blue-600">Ticket Baixo</span>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">R$ 10 - R$ 500</h3>
          <p className="text-gray-600">
            Ideal para e-commerces de produtos de consumo frequente ou baixo valor agregado
          </p>
        </div>

        <div
          onClick={() => handleTicketSelect('high')}
          className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${
            ticketType === 'high'
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-200 hover:border-blue-300'
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <DollarSign className="h-8 w-8 text-blue-500" />
            <span className="text-sm font-medium text-blue-600">Ticket Alto</span>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">R$ 1.000+</h3>
          <p className="text-gray-600">
            Para e-commerces de produtos premium ou de alto valor agregado
          </p>
        </div>
      </div>
    </div>
  );

  const renderMetricsForm = () => (
    <form onSubmit={handleMetricsSubmit} className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Insira as Métricas do seu E-commerce
      </h2>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Visitantes Únicos (últimos 30 dias)
          </label>
          <input
            type="number"
            value={metrics.visitors}
            onChange={(e) => handleMetricsChange('visitors', e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Adições ao Carrinho
          </label>
          <input
            type="number"
            value={metrics.addToCart}
            onChange={(e) => handleMetricsChange('addToCart', e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Iniciaram Checkout
          </label>
          <input
            type="number"
            value={metrics.startedCheckout}
            onChange={(e) => handleMetricsChange('startedCheckout', e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Compras Realizadas
          </label>
          <input
            type="number"
            value={metrics.purchases}
            onChange={(e) => handleMetricsChange('purchases', e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Ticket Médio (R$)
          </label>
          <input
            type="number"
            value={metrics.averageTicket}
            onChange={(e) => handleMetricsChange('averageTicket', e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Próximo: Métricas de Campanhas
          <ArrowRight className="ml-2 h-5 w-5" />
        </button>
      </div>
    </form>
  );

  const renderCampaignsForm = () => (
    <form onSubmit={handleCampaignsSubmit} className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Métricas de Campanhas
      </h2>
      
      <div className="space-y-6">
        {/* Facebook Ads */}
        <div className="bg-blue-50 p-6 rounded-lg">
          <div className="flex items-center mb-4">
            <h3 className="text-lg font-medium text-blue-900">Facebook Ads</h3>
            <div className="ml-2 px-2 py-1 bg-blue-100 rounded text-sm text-blue-800">
              CPC Ideal: R$ {BENCHMARK_METRICS.facebook.targetCPC}
            </div>
          </div>

          <div className="space-y-4">
            {/* CTR por tipo de anúncio */}
            <div>
              <h4 className="font-medium text-gray-700 mb-3">CTR por Formato</h4>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Estático (Meta: >{BENCHMARK_METRICS.facebook.staticCTR}%)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={metrics.facebook.staticCTR}
                    onChange={(e) => handleMetricsChange('facebook.staticCTR', e.target.value)}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Vídeo (Meta: >{BENCHMARK_METRICS.facebook.videoCTR}%)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={metrics.facebook.videoCTR}
                    onChange={(e) => handleMetricsChange('facebook.videoCTR', e.target.value)}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Catálogo (Meta: >{BENCHMARK_METRICS.facebook.catalogCTR}%)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={metrics.facebook.catalogCTR}
                    onChange={(e) => handleMetricsChange('facebook.catalogCTR', e.target.value)}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Métricas gerais do Facebook */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Frequência (Meta: <{BENCHMARK_METRICS.facebook.maxFrequency})
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={metrics.facebook.frequency}
                  onChange={(e) => handleMetricsChange('facebook.frequency', e.target.value)}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Criativos por Público (Min: {BENCHMARK_METRICS.facebook.minCreativesPerAudience})
                </label>
                <input
                  type="number"
                  value={metrics.facebook.creativesPerAudience}
                  onChange={(e) => handleMetricsChange('facebook.creativesPerAudience', e.target.value)}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Google Ads */}
        <div className="bg-red-50 p-6 rounded-lg">
          <div className="flex items-center mb-4">
            <h3 className="text-lg font-medium text-red-900">Google Ads</h3>
            <div className="ml-2 px-2 py-1 bg-red-100 rounded text-sm text-red-800">
              CPC Ideal: R$ {BENCHMARK_METRICS.google.targetCPC}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                CTR (Meta: >{BENCHMARK_METRICS.google.ctr}%)
              </label>
              <input
                type="number"
                step="0.01"
                value={metrics.google.ctr}
                onChange={(e) => handleMetricsChange('google.ctr', e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                CPC Médio (R$)
              </label>
              <input
                type="number"
                step="0.01"
                value={metrics.google.cpc}
                onChange={(e) => handleMetricsChange('google.cpc', e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Analisar Resultados
          <ArrowRight className="ml-2 h-5 w-5" />
        </button>
      </div>
    </form>
  );

  const renderAnalysis = () => {
    const cartRate = calculateConversionRate(metrics.addToCart, metrics.visitors);
    const checkoutRate = calculateConversionRate(metrics.startedCheckout, metrics.addToCart);
    const purchaseRate = calculateConversionRate(metrics.purchases, metrics.startedCheckout);
    const overallRate = calculateConversionRate(metrics.purchases, metrics.visitors);
    const problems = analyzeProblems();

    return (
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Análise Completa do Funil
        </h2>

        {/* Métricas do Funil */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Funil de Vendas</h3>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{metrics.visitors}</div>
              <div className="text-sm text-gray-600">Visitantes</div>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <ShoppingCart className="h-6 w-6 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{metrics.addToCart}</div>
              <div className="text-sm text-gray-600">Add to Cart ({cartRate})</div>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <ShoppingBag className="h-6 w-6 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{metrics.startedCheckout}</div>
              <div className="text-sm text-gray-600">Checkout ({checkoutRate})</div>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <CreditCard className="h-6 w-6 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{metrics.purchases}</div>
              <div className="text-sm text-gray-600">Compras ({purchaseRate})</div>
            </div>
          </div>
        </div>

        {/* Métricas de Campanhas */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Performance das Campanhas</h3>
          
          {/* Facebook Ads */}
          <div className="mb-6">
            <h4 className="font-medium text-blue-900 mb-4">Facebook Ads</h4>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="text-sm text-blue-600 mb-1">CTR Estático</div>
                <div className="text-2xl font-bold text-gray-900">
                  {metrics.facebook.staticCTR.toFixed(2)}%
                </div>
                <div className={`text-sm ${
                  metrics.facebook.staticCTR >= BENCHMARK_METRICS.facebook.staticCTR
                    ? 'text-green-600'
                    : 'text-red-600'
                }`}>
                  Meta: {BENCHMARK_METRICS.facebook.staticCTR}%
                </div>
              </div>
              
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="text-sm text-blue-600 mb-1">CTR Vídeo</div>
                <div className="text-2xl font-bold text-gray-900">
                  {metrics.facebook.videoCTR.toFixed(2)}%
                </div>
                <div className={`text-sm ${
                  metrics.facebook.videoCTR >= BENCHMARK_METRICS.facebook.videoCTR
                    ? 'text-green-600'
                    : 'text-red-600'
                }`}>
                  Meta: {BENCHMARK_METRICS.facebook.videoCTR}%
                </div>
              </div>
              
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="text-sm text-blue-600 mb-1">CTR Catálogo</div>
                <div className="text-2xl font-bold text-gray-900">
                  {metrics.facebook.catalogCTR.toFixed(2)}%
                </div>
                <div className={`text-sm ${
                  metrics.facebook.catalogCTR >= BENCHMARK_METRICS.facebook.catalogCTR
                    ? 'text-green-600'
                    : 'text-red-600'
                }`}>
                  Meta: {BENCHMARK_METRICS.facebook.catalogCTR}%
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="text-sm text-blue-600 mb-1">Frequência</div>
                <div className="text-2xl font-bold text-gray-900">
                  {metrics.facebook.frequency.toFixed(1)}
                </div>
                <div className={`text-sm ${
                  metrics.facebook.frequency <= BENCHMARK_METRICS.facebook.maxFrequency
                    ? 'text-green-600'
                    : 'text-red-600'
                }`}>
                  Meta: &lt;{BENCHMARK_METRICS.facebook.maxFrequency}
                </div>
              </div>
              
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="text-sm text-blue-600 mb-1">Criativos por Público</div>
                <div className="text-2xl font-bold text-gray-900">
                  {metrics.facebook.creativesPerAudience}
                </div>
                <div className={`text-sm ${
                  metrics.facebook.creativesPerAudience >= BENCHMARK_METRICS.facebook.minCreativesPerAudience
                    ? 'text-green-600'
                    : 'text-red-600'
                }`}>
                  Meta: ≥{BENCHMARK_METRICS.facebook.minCreativesPerAudience}
                </div>
              </div>
            </div>
          </div>

          {/* Google Ads */}
          <div>
            <h4 className="font-medium text-red-900 mb-4">Google Ads</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-red-50 rounded-lg">
                <div className="text-sm text-red-600 mb-1">CTR</div>
                <div className="text-2xl font-bold text-gray-900">
                  {metrics.google.ctr.toFixed(2)}%
                </div>
                <div className={`text-sm ${
                  metrics.google.ctr >= BENCHMARK_METRICS.google.ctr
                    ? 'text-green-600'
                    : 'text-red-600'
                }`}>
                  Meta: {BENCHMARK_METRICS.google.ctr}%
                </div>
              </div>
              
              <div className="p-4 bg-red-50 rounded-lg">
                <div className="text-sm text-red-600 mb-1">CPC</div>
                <div className="text-2xl font-bold text-gray-900">
                  R$ {metrics.google.cpc.toFixed(2)}
                </div>
                <div className={`text-sm ${
                  metrics.google.cpc <= BENCHMARK_METRICS.google.targetCPC
                    ? 'text-green-600'
                    : 'text-red-600'
                }`}>
                  Meta: R$ {BENCHMARK_METRICS.google.targetCPC}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Problemas Identificados */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Problemas Identificados
          </h3>
          
          <div className="space-y-4">
            {problems.map((problem, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start">
                  <div className={`p-2 rounded-full mr-4 ${
                    problem.severity === 'high' ? 'bg-red-100' :
                    problem.severity === 'medium' ? 'bg-yellow-100' : 'bg-blue-100'
                  }`}>
                    <AlertCircle className={`h-6 w-6 ${
                      problem.severity === 'high' ? 'text-red-600' :
                      problem.severity === 'medium' ? 'text-yellow-600' : 'text-blue-600'
                    }`} />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{problem.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">{problem.description}</p>
                    <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                      <div className="text-sm font-medium text-gray-900 mb-1">Solução Recomendada:</div>
                      <p className="text-sm text-gray-600">{problem.solution}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {problems.length === 0 && (
              <div className="text-center py-8">
                <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-3" />
                <h4 className="text-lg font-medium text-gray-900">
                  Nenhum problema crítico identificado
                </h4>
                <p className="text-gray-600">
                  Suas campanhas estão dentro dos parâmetros recomendados
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            onClick={() => setStep('campaigns')}
            className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Editar Métricas
          </button>
          <button
            onClick={() => navigate('/simulator')}
            className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Simular Melhorias
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {step === 'ticket' && renderTicketSelection()}
      {step === 'metrics' && renderMetricsForm()}
      {step === 'campaigns' && renderCampaignsForm()}
      {step === 'analysis' && renderAnalysis()}
    </div>
  );
};

export default EcommerceAnalysis; 