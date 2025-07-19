import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  MessageSquare,
  ArrowRight, 
  Building2,
  Calendar,
  DollarSign,
  Users,
  Target,
  AlertCircle,
  CheckCircle,
  Video,
  Image,
  Filter
} from 'lucide-react';

interface MetaAdsMetrics {
  staticCTR: number;
  videoCTR: number;
  spend: number;
  clicks: number;
  impressions: number;
}

interface GoogleAdsMetrics {
  searchCTR: number;
  searchCPC: number;
  pmaxCTR: number;
  pmaxCPL: number;
  spend: number;
  clicks: number;
}

interface FunnelMetrics {
  leads: number;
  mql: number;
  sql: number;
  opportunities: number;
  sales: number;
  averageTicket: number;
  lpFormRate: number; // Taxa de conversão do formulário da Landing Page
}

interface MetricsForm {
  funnel: FunnelMetrics;
  meta: MetaAdsMetrics;
  google: GoogleAdsMetrics;
}

interface Problem {
  id: number;
  title: string;
  description: string;
  solution: string;
  category: 'creative' | 'campaign' | 'audience' | 'technical' | 'qualification';
  severity: 'high' | 'medium' | 'low';
}

const BENCHMARK_METRICS = {
  meta: {
    staticCTR: 0.8,
    videoCTR: 1.0
  },
  google: {
    searchCTR: 7.0,
    pmaxCTR: 0.8,
    pmaxCPLMultiplier: 1.3 // 30% maior que o CPL de pesquisa
  },
  funnel: {
    lpFormRate: 15, // Taxa de conversão mínima do formulário
    leadToMQLRate: 30, // % de leads que viram MQL
    mqlToSQLRate: 20, // % de MQLs que viram SQL
    sqlToOppRate: 30, // % de SQLs que viram oportunidades
    oppToSaleRate: 25 // % de oportunidades que viram vendas
  }
};

const INSIDE_SALES_B2B_PROBLEMS: Problem[] = [
  {
    id: 1,
    title: 'Baixo Engajamento',
    description: 'CTR abaixo do benchmark para o formato',
    solution: 'Teste A/B constante de criativos (imagens, vídeos, carrosséis)',
    category: 'creative',
    severity: 'high'
  },
  {
    id: 2,
    title: 'Criativos Desgastados',
    description: 'Queda progressiva no CTR dos anúncios',
    solution: 'Headlines mais persuasivos com gatilhos mentais específicos para B2B',
    category: 'creative',
    severity: 'medium'
  },
  {
    id: 3,
    title: 'Segmentação Inadequada',
    description: 'Alto custo por lead com baixa qualificação',
    solution: 'Segmentação por cargos e empresas específicas do setor',
    category: 'audience',
    severity: 'high'
  },
  {
    id: 4,
    title: 'Otimização Incorreta',
    description: 'Campanhas otimizadas para cliques em vez de conversões',
    solution: 'Otimize para conversões qualificadas (MQL/SQL)',
    category: 'campaign',
    severity: 'medium'
  },
  {
    id: 5,
    title: 'Qualificação Ineficiente',
    description: 'Alto volume de leads com baixa taxa de conversão para MQL',
    solution: 'Implementar critérios de qualificação mais rigorosos no formulário',
    category: 'qualification',
    severity: 'high'
  },
  {
    id: 6,
    title: 'Funil Longo Demais',
    description: 'Tempo excessivo entre MQL e SQL',
    solution: 'Automatizar processo de qualificação e agilizar follow-up',
    category: 'qualification',
    severity: 'medium'
  },
  {
    id: 7,
    title: 'Pixel Mal Configurado',
    description: 'Eventos de conversão não sendo registrados corretamente',
    solution: 'Implementar pixel de conversão com eventos específicos para cada etapa do funil',
    category: 'technical',
    severity: 'high'
  }
];

const InsideSalesB2B: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<'metrics' | 'campaigns' | 'analysis'>('metrics');
  const [metrics, setMetrics] = useState<MetricsForm>({
    funnel: {
      leads: 0,
      mql: 0,
      sql: 0,
      opportunities: 0,
      sales: 0,
      averageTicket: 0,
      lpFormRate: 0
    },
    meta: {
      staticCTR: 0,
      videoCTR: 0,
      spend: 0,
      clicks: 0,
      impressions: 0
    },
    google: {
      searchCTR: 0,
      searchCPC: 0,
      pmaxCTR: 0,
      pmaxCPL: 0,
      spend: 0,
      clicks: 0
    }
  });

  const handleMetricsChange = (
    category: 'funnel' | 'meta' | 'google',
    field: string,
    value: string
  ) => {
    setMetrics(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: Number(value) || 0
      }
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
    const totalSpend = metrics.meta.spend + metrics.google.spend;
    if (!metrics.funnel.sales) return 0;
    return totalSpend / metrics.funnel.sales;
  };

  const calculateROAS = (): number => {
    const totalSpend = metrics.meta.spend + metrics.google.spend;
    if (!totalSpend) return 0;
    return (metrics.funnel.sales * metrics.funnel.averageTicket) / totalSpend;
  };

  const analyzeProblems = (): Problem[] => {
    const problems: Problem[] = [];
    
    // Verifica taxa de conversão do formulário
    if (metrics.funnel.lpFormRate < BENCHMARK_METRICS.funnel.lpFormRate) {
      problems.push(
        INSIDE_SALES_B2B_PROBLEMS.find(p => p.category === 'technical') ||
        INSIDE_SALES_B2B_PROBLEMS[6]
      );
    }

    // Verifica qualificação de leads
    const leadToMQLRate = (metrics.funnel.mql / metrics.funnel.leads) * 100;
    if (leadToMQLRate < BENCHMARK_METRICS.funnel.leadToMQLRate) {
      problems.push(
        INSIDE_SALES_B2B_PROBLEMS.find(p => p.category === 'qualification') ||
        INSIDE_SALES_B2B_PROBLEMS[4]
      );
    }

    // Verifica CTR do Meta Ads
    if (metrics.meta.staticCTR < BENCHMARK_METRICS.meta.staticCTR) {
      problems.push(
        INSIDE_SALES_B2B_PROBLEMS.find(p => p.title === 'Baixo Engajamento') ||
        INSIDE_SALES_B2B_PROBLEMS[0]
      );
    }
    if (metrics.meta.videoCTR < BENCHMARK_METRICS.meta.videoCTR) {
      problems.push(
        INSIDE_SALES_B2B_PROBLEMS.find(p => p.title === 'Criativos Desgastados') ||
        INSIDE_SALES_B2B_PROBLEMS[1]
      );
    }

    // Verifica CTR do Google Ads
    if (metrics.google.searchCTR < BENCHMARK_METRICS.google.searchCTR) {
      problems.push(
        INSIDE_SALES_B2B_PROBLEMS.find(p => p.category === 'campaign') ||
        INSIDE_SALES_B2B_PROBLEMS[3]
      );
    }
    if (metrics.google.pmaxCTR < BENCHMARK_METRICS.google.pmaxCTR) {
      problems.push(
        INSIDE_SALES_B2B_PROBLEMS.find(p => p.category === 'audience') ||
        INSIDE_SALES_B2B_PROBLEMS[2]
      );
    }

    // Verifica eficiência do funil
    const mqlToSQLRate = (metrics.funnel.sql / metrics.funnel.mql) * 100;
    if (mqlToSQLRate < BENCHMARK_METRICS.funnel.mqlToSQLRate) {
      problems.push(
        INSIDE_SALES_B2B_PROBLEMS.find(p => p.title === 'Funil Longo Demais') ||
        INSIDE_SALES_B2B_PROBLEMS[5]
      );
    }

    return problems;
  };

  const renderFunnelMetrics = () => (
    <form onSubmit={handleMetricsSubmit} className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Métricas do Funil B2B
      </h2>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Total de Leads
          </label>
          <input
            type="number"
            value={metrics.funnel.leads}
            onChange={(e) => handleMetricsChange('funnel', 'leads', e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Marketing Qualified Leads (MQL)
          </label>
          <input
            type="number"
            value={metrics.funnel.mql}
            onChange={(e) => handleMetricsChange('funnel', 'mql', e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Sales Qualified Leads (SQL)
          </label>
          <input
            type="number"
            value={metrics.funnel.sql}
            onChange={(e) => handleMetricsChange('funnel', 'sql', e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Oportunidades
          </label>
          <input
            type="number"
            value={metrics.funnel.opportunities}
            onChange={(e) => handleMetricsChange('funnel', 'opportunities', e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Vendas Fechadas
          </label>
          <input
            type="number"
            value={metrics.funnel.sales}
            onChange={(e) => handleMetricsChange('funnel', 'sales', e.target.value)}
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
            value={metrics.funnel.averageTicket}
            onChange={(e) => handleMetricsChange('funnel', 'averageTicket', e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Taxa de Conversão do Formulário (%)
          </label>
          <input
            type="number"
            step="0.01"
            value={metrics.funnel.lpFormRate}
            onChange={(e) => handleMetricsChange('funnel', 'lpFormRate', e.target.value)}
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

  const renderCampaignsMetrics = () => (
    <form onSubmit={handleCampaignsSubmit} className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Métricas de Campanhas B2B
      </h2>
      
      <div className="space-y-6">
        {/* Meta Ads */}
        <div className="bg-blue-50 p-6 rounded-lg">
          <div className="flex items-center mb-4">
            <h3 className="text-lg font-medium text-blue-900">Meta Ads</h3>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                CTR Estático (Meta: >{BENCHMARK_METRICS.meta.staticCTR}%)
              </label>
              <input
                type="number"
                step="0.01"
                value={metrics.meta.staticCTR}
                onChange={(e) => handleMetricsChange('meta', 'staticCTR', e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                CTR Vídeo (Meta: >{BENCHMARK_METRICS.meta.videoCTR}%)
              </label>
              <input
                type="number"
                step="0.01"
                value={metrics.meta.videoCTR}
                onChange={(e) => handleMetricsChange('meta', 'videoCTR', e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Investimento (R$)
              </label>
              <input
                type="number"
                value={metrics.meta.spend}
                onChange={(e) => handleMetricsChange('meta', 'spend', e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Cliques
              </label>
              <input
                type="number"
                value={metrics.meta.clicks}
                onChange={(e) => handleMetricsChange('meta', 'clicks', e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Google Ads */}
        <div className="bg-red-50 p-6 rounded-lg">
          <div className="flex items-center mb-4">
            <h3 className="text-lg font-medium text-red-900">Google Ads</h3>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  CTR Pesquisa (Meta: >{BENCHMARK_METRICS.google.searchCTR}%)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={metrics.google.searchCTR}
                  onChange={(e) => handleMetricsChange('google', 'searchCTR', e.target.value)}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  CPC Pesquisa (R$)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={metrics.google.searchCPC}
                  onChange={(e) => handleMetricsChange('google', 'searchCPC', e.target.value)}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  CTR PMax (Meta: >{BENCHMARK_METRICS.google.pmaxCTR}%)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={metrics.google.pmaxCTR}
                  onChange={(e) => handleMetricsChange('google', 'pmaxCTR', e.target.value)}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  CPL PMax (R$)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={metrics.google.pmaxCPL}
                  onChange={(e) => handleMetricsChange('google', 'pmaxCPL', e.target.value)}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
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
    const problems = analyzeProblems();
    const leadToMQLRate = calculateConversionRate(metrics.funnel.mql, metrics.funnel.leads);
    const mqlToSQLRate = calculateConversionRate(metrics.funnel.sql, metrics.funnel.mql);
    const sqlToOppRate = calculateConversionRate(metrics.funnel.opportunities, metrics.funnel.sql);
    const oppToSaleRate = calculateConversionRate(metrics.funnel.sales, metrics.funnel.opportunities);
    const overallRate = calculateConversionRate(metrics.funnel.sales, metrics.funnel.leads);

    return (
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Análise do Funil Inside Sales B2B
        </h2>

        {/* Métricas do Funil */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Funil de Vendas B2B</h3>
          <div className="grid md:grid-cols-5 gap-4">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{metrics.funnel.leads}</div>
              <div className="text-sm text-gray-600">Leads</div>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Filter className="h-6 w-6 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{metrics.funnel.mql}</div>
              <div className="text-sm text-gray-600">MQL ({leadToMQLRate})</div>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Target className="h-6 w-6 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{metrics.funnel.sql}</div>
              <div className="text-sm text-gray-600">SQL ({mqlToSQLRate})</div>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Building2 className="h-6 w-6 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{metrics.funnel.opportunities}</div>
              <div className="text-sm text-gray-600">Oportunidades ({sqlToOppRate})</div>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <DollarSign className="h-6 w-6 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{metrics.funnel.sales}</div>
              <div className="text-sm text-gray-600">Vendas ({oppToSaleRate})</div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Taxa de conversão total:</p>
                <p className="text-2xl font-bold text-blue-600">{overallRate}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Faturamento mensal:</p>
                <p className="text-2xl font-bold text-green-600">
                  R$ {(metrics.funnel.sales * metrics.funnel.averageTicket).toLocaleString('pt-BR')}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Métricas de Campanhas */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Performance das Campanhas</h3>
          
          {/* Meta Ads */}
          <div className="mb-6">
            <h4 className="font-medium text-blue-900 mb-4">Meta Ads</h4>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="text-sm text-blue-600 mb-1">CTR Estático</div>
                <div className="text-2xl font-bold text-gray-900">
                  {metrics.meta.staticCTR.toFixed(2)}%
                </div>
                <div className={`text-sm ${
                  metrics.meta.staticCTR >= BENCHMARK_METRICS.meta.staticCTR
                    ? 'text-green-600'
                    : 'text-red-600'
                }`}>
                  Meta: {BENCHMARK_METRICS.meta.staticCTR}%
                </div>
              </div>
              
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="text-sm text-blue-600 mb-1">CTR Vídeo</div>
                <div className="text-2xl font-bold text-gray-900">
                  {metrics.meta.videoCTR.toFixed(2)}%
                </div>
                <div className={`text-sm ${
                  metrics.meta.videoCTR >= BENCHMARK_METRICS.meta.videoCTR
                    ? 'text-green-600'
                    : 'text-red-600'
                }`}>
                  Meta: {BENCHMARK_METRICS.meta.videoCTR}%
                </div>
              </div>
            </div>
          </div>

          {/* Google Ads */}
          <div>
            <h4 className="font-medium text-red-900 mb-4">Google Ads</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-red-50 rounded-lg">
                <div className="text-sm text-red-600 mb-1">CTR Pesquisa</div>
                <div className="text-2xl font-bold text-gray-900">
                  {metrics.google.searchCTR.toFixed(2)}%
                </div>
                <div className={`text-sm ${
                  metrics.google.searchCTR >= BENCHMARK_METRICS.google.searchCTR
                    ? 'text-green-600'
                    : 'text-red-600'
                }`}>
                  Meta: {BENCHMARK_METRICS.google.searchCTR}%
                </div>
              </div>
              
              <div className="p-4 bg-red-50 rounded-lg">
                <div className="text-sm text-red-600 mb-1">CTR PMax</div>
                <div className="text-2xl font-bold text-gray-900">
                  {metrics.google.pmaxCTR.toFixed(2)}%
                </div>
                <div className={`text-sm ${
                  metrics.google.pmaxCTR >= BENCHMARK_METRICS.google.pmaxCTR
                    ? 'text-green-600'
                    : 'text-red-600'
                }`}>
                  Meta: {BENCHMARK_METRICS.google.pmaxCTR}%
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
      {step === 'metrics' && renderFunnelMetrics()}
      {step === 'campaigns' && renderCampaignsMetrics()}
      {step === 'analysis' && renderAnalysis()}
    </div>
  );
};

export default InsideSalesB2B; 