import React from 'react';
import { 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Download,
  RefreshCw,
  Target,
  DollarSign,
  BarChart3
} from 'lucide-react';

interface ResultsDisplayProps {
  results: {
    stages: Array<{
      name: string;
      current: number;
      benchmark: number;
      status: 'good' | 'acceptable' | 'poor';
      impact: number;
    }>;
    recommendations: Array<{
      stage: string;
      issue: string;
      solution: string;
      priority: 'high' | 'medium' | 'low';
    }>;
    growthSimulation: {
      currentRevenue: number;
      potentialRevenue: number;
      improvements: Array<{
        stage: string;
        currentRate: number;
        improvedRate: number;
        revenueImpact: number;
      }>;
    };
  };
  businessModel: string;
  sector: string;
  onNewAnalysis: () => void;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ 
  results, 
  businessModel, 
  sector, 
  onNewAnalysis 
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good': return 'text-green-600 bg-green-50';
      case 'acceptable': return 'text-yellow-600 bg-yellow-50';
      case 'poor': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'good': return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'acceptable': return <AlertTriangle className="h-5 w-5 text-yellow-600" />;
      case 'poor': return <AlertTriangle className="h-5 w-5 text-red-600" />;
      default: return <Target className="h-5 w-5 text-gray-600" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const generatePDF = () => {
    // This would integrate with a PDF generation library
    alert('Funcionalidade de PDF será implementada em breve!');
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Análise Completa do Funil
            </h2>
            <p className="text-gray-600">
              {businessModel} • {sector}
            </p>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={generatePDF}
              className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              <Download className="h-5 w-5" />
              <span>Gerar PDF</span>
            </button>
            <button
              onClick={onNewAnalysis}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <RefreshCw className="h-5 w-5" />
              <span>Nova Análise</span>
            </button>
          </div>
        </div>
      </div>

      {/* Funnel Stages */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">
          📊 Performance por Etapa
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {results.stages.map((stage, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-gray-900">{stage.name}</h4>
                {getStatusIcon(stage.status)}
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Atual:</span>
                  <span className={`text-sm font-medium px-2 py-1 rounded ${getStatusColor(stage.status)}`}>
                    {stage.current}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Benchmark:</span>
                  <span className="text-sm font-medium text-gray-900">
                    {stage.benchmark}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Diferença:</span>
                  <span className={`text-sm font-medium ${stage.impact < 0 ? 'text-red-600' : 'text-green-600'}`}>
                    {stage.impact > 0 ? '+' : ''}{stage.impact.toFixed(1)}%
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-3">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      stage.status === 'good' ? 'bg-green-500' :
                      stage.status === 'acceptable' ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${Math.min((stage.current / stage.benchmark) * 100, 100)}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Growth Simulation */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">
          📈 Simulador de Crescimento
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <DollarSign className="h-5 w-5 text-gray-600" />
              <span className="text-sm text-gray-600">Receita Atual</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">
              R$ {results.growthSimulation.currentRevenue.toLocaleString()}
            </p>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <span className="text-sm text-green-600">Potencial com Melhorias</span>
            </div>
            <p className="text-2xl font-bold text-green-900">
              R$ {results.growthSimulation.potentialRevenue.toLocaleString()}
            </p>
            <p className="text-sm text-green-700 mt-1">
              +R$ {(results.growthSimulation.potentialRevenue - results.growthSimulation.currentRevenue).toLocaleString()} 
              ({(((results.growthSimulation.potentialRevenue - results.growthSimulation.currentRevenue) / results.growthSimulation.currentRevenue) * 100).toFixed(1)}%)
            </p>
          </div>
        </div>

        <div className="mt-6">
          <h4 className="font-medium text-gray-900 mb-3">Impacto por Melhoria:</h4>
          <div className="space-y-2">
            {results.growthSimulation.improvements.map((improvement, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <span className="font-medium text-gray-900">{improvement.stage}</span>
                  <span className="text-sm text-gray-600 ml-2">
                    ({improvement.currentRate}% → {improvement.improvedRate}%)
                  </span>
                </div>
                <span className="text-green-600 font-medium">
                  +R$ {improvement.revenueImpact.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">
          🎯 Recomendações de Melhoria
        </h3>
        <div className="space-y-4">
          {results.recommendations.map((recommendation, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-medium text-gray-900">{recommendation.stage}</h4>
                  <p className="text-sm text-gray-600 mt-1">{recommendation.issue}</p>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded ${getPriorityColor(recommendation.priority)}`}>
                  {recommendation.priority === 'high' ? 'Alta' : 
                   recommendation.priority === 'medium' ? 'Média' : 'Baixa'}
                </span>
              </div>
              
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-sm text-blue-900">
                  <strong>Solução:</strong> {recommendation.solution}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Next Steps */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 border border-blue-200">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          🚀 Próximos Passos
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Implementação Imediata</h4>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Foque nas recomendações de alta prioridade</li>
              <li>• Implemente melhorias em ordem de impacto</li>
              <li>• Monitore métricas semanalmente</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Monitoramento</h4>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Refaça análise mensalmente</li>
              <li>• Compare com benchmarks atualizados</li>
              <li>• Ajuste estratégias conforme necessário</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsDisplay;