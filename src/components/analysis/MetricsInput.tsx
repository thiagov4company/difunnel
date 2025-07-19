import React, { useState } from 'react';
import { ArrowLeft, Info, TrendingUp } from 'lucide-react';
import { useData } from '../../contexts/DataContext';

interface MetricsInputProps {
  businessModel: string;
  sector: string;
  onSubmit: (metrics: Record<string, number>) => void;
  onBack: () => void;
}

const MetricsInput: React.FC<MetricsInputProps> = ({ businessModel, sector, onSubmit, onBack }) => {
  const [metrics, setMetrics] = useState<Record<string, number>>({});
  const { getMarketBenchmark } = useData();

  const getMetricsConfig = () => {
    switch (businessModel) {
      case 'ecommerce-low':
      case 'ecommerce-high':
        return [
          { key: 'visitors_to_cart', label: 'Visitantes → Carrinho (%)', placeholder: 'Ex: 10' },
          { key: 'cart_to_checkout', label: 'Carrinho → Checkout (%)', placeholder: 'Ex: 10' },
          { key: 'checkout_to_purchase', label: 'Checkout → Compra (%)', placeholder: 'Ex: 20' },
          { key: 'visitors_to_purchase', label: 'Visitantes → Compra (%)', placeholder: 'Ex: 2' }
        ];
      case 'inside-sales-b2b':
        return [
          { key: 'lead_to_opportunity', label: 'Lead → Oportunidade (%)', placeholder: 'Ex: 15' },
          { key: 'opportunity_to_sale', label: 'Oportunidade → Venda (%)', placeholder: 'Ex: 8' }
        ];
      case 'inside-sales-b2c':
        return [
          { key: 'whatsapp_to_sale', label: 'WhatsApp → Venda (%)', placeholder: 'Ex: 4' },
          { key: 'whatsapp_to_opportunity', label: 'WhatsApp → Oportunidade (%)', placeholder: 'Ex: 25' },
          { key: 'opportunity_to_attendance', label: 'Oportunidade → Comparecimento (%)', placeholder: 'Ex: 30' },
          { key: 'attendance_to_sale', label: 'Comparecimento → Venda (%)', placeholder: 'Ex: 30' }
        ];
      case 'pdv':
        return [
          { key: 'lead_to_opportunity', label: 'Lead → Oportunidade (%)', placeholder: 'Ex: 23' },
          { key: 'opportunity_to_sale', label: 'Oportunidade → Venda (%)', placeholder: 'Ex: 21' },
          { key: 'lead_to_sale', label: 'Lead → Venda (%)', placeholder: 'Ex: 5' }
        ];
      default:
        return [];
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(metrics);
  };

  const handleInputChange = (key: string, value: string) => {
    const numValue = parseFloat(value) || 0;
    setMetrics(prev => ({ ...prev, [key]: numValue }));
  };

  const getBusinessModelName = () => {
    const names = {
      'ecommerce-low': 'E-commerce Low Ticket',
      'ecommerce-high': 'E-commerce High Ticket',
      'inside-sales-b2b': 'Inside Sales B2B',
      'inside-sales-b2c': 'Inside Sales B2C',
      'pdv': 'PDV (Ponto de Venda)'
    };
    return names[businessModel as keyof typeof names] || businessModel;
  };

  const metricsConfig = getMetricsConfig();

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Voltar</span>
          </button>
          <div className="text-right">
            <h3 className="text-lg font-semibold text-gray-900">
              {getBusinessModelName()}
            </h3>
            <p className="text-sm text-gray-600">
              Setor: {sector}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {metricsConfig.map((metric) => {
            const benchmark = getMarketBenchmark(businessModel, sector, metric.key);
            return (
              <div key={metric.key} className="space-y-2">
                <label htmlFor={metric.key} className="block text-sm font-medium text-gray-700">
                  {metric.label}
                </label>
                <div className="relative">
                  <input
                    type="number"
                    id={metric.key}
                    step="0.1"
                    min="0"
                    max="100"
                    value={metrics[metric.key] || ''}
                    onChange={(e) => handleInputChange(metric.key, e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder={metric.placeholder}
                    required
                  />
                  <div className="absolute right-3 top-3 text-gray-400">
                    %
                  </div>
                </div>
                {benchmark > 0 && (
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <TrendingUp className="h-4 w-4" />
                    <span>Benchmark do mercado: {benchmark}%</span>
                  </div>
                )}
              </div>
            );
          })}

          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <div className="flex items-start space-x-3">
              <Info className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-blue-900">
                  Dica importante
                </h4>
                <p className="text-sm text-blue-800 mt-1">
                  Insira os valores percentuais das suas taxas de conversão. Os benchmarks 
                  são baseados em dados reais do mercado brasileiro.
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onBack}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Analisar Funil
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MetricsInput;