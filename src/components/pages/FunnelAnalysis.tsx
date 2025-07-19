import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../../contexts/DataContext';
import Header from '../common/Header';
import BusinessModelSelector from '../analysis/BusinessModelSelector';
import MetricsInput from '../analysis/MetricsInput';
import ResultsDisplay from '../analysis/ResultsDisplay';
import { FunnelData } from '../../contexts/DataContext';

const FunnelAnalysis: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedModel, setSelectedModel] = useState<string>('');
  const [selectedSector, setSelectedSector] = useState<string>('');
  const [metrics, setMetrics] = useState<Record<string, number>>({});
  const [analysisResults, setAnalysisResults] = useState<any>(null);
  const { saveFunnel, getMarketBenchmark } = useData();
  const navigate = useNavigate();

  const handleModelSelect = (model: string, sector: string) => {
    setSelectedModel(model);
    setSelectedSector(sector);
    setCurrentStep(2);
  };

  const handleMetricsSubmit = (inputMetrics: Record<string, number>) => {
    setMetrics(inputMetrics);
    
    // Generate analysis results
    const results = generateAnalysisResults(selectedModel, selectedSector, inputMetrics);
    setAnalysisResults(results);
    
    // Save funnel data
    const funnelData: FunnelData = {
      id: Date.now().toString(),
      businessModel: selectedModel as any,
      sector: selectedSector,
      metrics: inputMetrics,
      results,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    saveFunnel(funnelData);
    setCurrentStep(3);
  };

  const generateAnalysisResults = (model: string, sector: string, metrics: Record<string, number>) => {
    const stages = Object.keys(metrics).map(metric => {
      const benchmark = getMarketBenchmark(model, sector, metric);
      const current = metrics[metric];
      
      let status: 'good' | 'acceptable' | 'poor' = 'good';
      if (current < benchmark * 0.7) status = 'poor';
      else if (current < benchmark * 0.9) status = 'acceptable';
      
      return {
        name: getMetricDisplayName(metric),
        current,
        benchmark,
        status,
        impact: benchmark - current
      };
    });

    const recommendations = stages
      .filter(stage => stage.status !== 'good')
      .map(stage => ({
        stage: stage.name,
        issue: `Taxa de conversão abaixo do benchmark (${stage.current}% vs ${stage.benchmark}%)`,
        solution: getSolutionForMetric(getMetricKey(stage.name), model),
        priority: stage.status === 'poor' ? 'high' as const : 'medium' as const
      }));

    // Simple growth simulation
    const currentRevenue = 100000; // Mock value
    const improvements = stages.map(stage => ({
      stage: stage.name,
      currentRate: stage.current,
      improvedRate: stage.benchmark,
      revenueImpact: (stage.benchmark - stage.current) * 1000 // Mock calculation
    }));

    const potentialRevenue = currentRevenue + improvements.reduce((sum, imp) => sum + imp.revenueImpact, 0);

    return {
      stages,
      recommendations,
      growthSimulation: {
        currentRevenue,
        potentialRevenue,
        improvements
      }
    };
  };

  const getMetricDisplayName = (metric: string): string => {
    const names: Record<string, string> = {
      'visitors_to_cart': 'Visitantes → Carrinho',
      'cart_to_checkout': 'Carrinho → Checkout',
      'checkout_to_purchase': 'Checkout → Compra',
      'visitors_to_purchase': 'Visitantes → Compra',
      'lead_to_opportunity': 'Lead → Oportunidade',
      'opportunity_to_sale': 'Oportunidade → Venda',
      'whatsapp_to_sale': 'WhatsApp → Venda',
      'whatsapp_to_opportunity': 'WhatsApp → Oportunidade',
      'opportunity_to_attendance': 'Oportunidade → Comparecimento',
      'attendance_to_sale': 'Comparecimento → Venda',
      'lead_to_sale': 'Lead → Venda'
    };
    return names[metric] || metric;
  };

  const getMetricKey = (displayName: string): string => {
    const keys: Record<string, string> = {
      'Visitantes → Carrinho': 'visitors_to_cart',
      'Carrinho → Checkout': 'cart_to_checkout',
      'Checkout → Compra': 'checkout_to_purchase',
      'Visitantes → Compra': 'visitors_to_purchase',
      'Lead → Oportunidade': 'lead_to_opportunity',
      'Oportunidade → Venda': 'opportunity_to_sale',
      'WhatsApp → Venda': 'whatsapp_to_sale',
      'WhatsApp → Oportunidade': 'whatsapp_to_opportunity',
      'Oportunidade → Comparecimento': 'opportunity_to_attendance',
      'Comparecimento → Venda': 'attendance_to_sale',
      'Lead → Venda': 'lead_to_sale'
    };
    return keys[displayName] || displayName;
  };

  const getSolutionForMetric = (metric: string, model: string): string => {
    const solutions: Record<string, string> = {
      'visitors_to_cart': 'Melhore a UX/UI, fotos dos produtos e descrições mais atrativas',
      'cart_to_checkout': 'Simplifique o processo de checkout e reduza campos obrigatórios',
      'checkout_to_purchase': 'Implemente recuperação de carrinho e múltiplas formas de pagamento',
      'lead_to_opportunity': 'Melhore a qualificação de leads e tempo de resposta',
      'opportunity_to_sale': 'Treine equipe em técnicas de fechamento e objeções',
      'whatsapp_to_sale': 'Estruture melhor o processo de vendas via WhatsApp',
      'whatsapp_to_opportunity': 'Melhore a abordagem inicial e qualificação rápida'
    };
    return solutions[metric] || 'Analise os dados e implemente melhorias específicas';
  };

  const handleBackToSelector = () => {
    setCurrentStep(1);
    setSelectedModel('');
    setSelectedSector('');
    setMetrics({});
    setAnalysisResults(null);
  };

  const handleNewAnalysis = () => {
    setCurrentStep(1);
    setSelectedModel('');
    setSelectedSector('');
    setMetrics({});
    setAnalysisResults(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${currentStep >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                1
              </div>
              <div className={`h-1 w-16 ${currentStep >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`} />
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${currentStep >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                2
              </div>
              <div className={`h-1 w-16 ${currentStep >= 3 ? 'bg-blue-600' : 'bg-gray-200'}`} />
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${currentStep >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                3
              </div>
            </div>
            <div className="text-sm text-gray-600">
              Passo {currentStep} de 3
            </div>
          </div>
          <div className="mt-4">
            {currentStep === 1 && (
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Selecione o Modelo de Negócio</h1>
                <p className="text-gray-600">Escolha o tipo de negócio que melhor descreve sua empresa</p>
              </div>
            )}
            {currentStep === 2 && (
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Insira as Métricas</h1>
                <p className="text-gray-600">Digite os dados atuais do seu funil de vendas</p>
              </div>
            )}
            {currentStep === 3 && (
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Resultados da Análise</h1>
                <p className="text-gray-600">Análise completa com benchmarks e recomendações</p>
              </div>
            )}
          </div>
        </div>

        {/* Step Content */}
        {currentStep === 1 && (
          <BusinessModelSelector onSelect={handleModelSelect} />
        )}

        {currentStep === 2 && (
          <MetricsInput
            businessModel={selectedModel}
            sector={selectedSector}
            onSubmit={handleMetricsSubmit}
            onBack={handleBackToSelector}
          />
        )}

        {currentStep === 3 && analysisResults && (
          <ResultsDisplay
            results={analysisResults}
            businessModel={selectedModel}
            sector={selectedSector}
            onNewAnalysis={handleNewAnalysis}
          />
        )}
      </div>
    </div>
  );
};

export default FunnelAnalysis;