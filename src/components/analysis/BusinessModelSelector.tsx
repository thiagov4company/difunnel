import React from 'react';
import { ShoppingCart, Users, Target, Building, Briefcase } from 'lucide-react';

interface BusinessModelSelectorProps {
  onSelect: (model: string, sector: string) => void;
}

const BusinessModelSelector: React.FC<BusinessModelSelectorProps> = ({ onSelect }) => {
  const businessModels = [
    {
      id: 'ecommerce-low',
      name: 'E-commerce Low Ticket',
      description: 'Produtos até R$ 500',
      icon: ShoppingCart,
      color: 'blue',
      sectors: ['geral']
    },
    {
      id: 'ecommerce-high',
      name: 'E-commerce High Ticket',
      description: 'Produtos acima de R$ 1.000',
      icon: ShoppingCart,
      color: 'purple',
      sectors: ['geral']
    },
    {
      id: 'inside-sales-b2b',
      name: 'Inside Sales B2B',
      description: 'Vendas para empresas',
      icon: Building,
      color: 'green',
      sectors: ['agronegocio', 'marketing', 'consultoria', 'educacao', 'saude']
    },
    {
      id: 'inside-sales-b2c',
      name: 'Inside Sales B2C',
      description: 'Vendas para pessoas físicas',
      icon: Users,
      color: 'orange',
      sectors: ['geral']
    },
    {
      id: 'pdv',
      name: 'PDV (Ponto de Venda)',
      description: 'Vendas presenciais',
      icon: Target,
      color: 'red',
      sectors: ['geral']
    }
  ];

  const sectorNames = {
    'geral': 'Geral',
    'agronegocio': 'Agronegócio',
    'marketing': 'Agências de Marketing',
    'consultoria': 'Consultoria',
    'educacao': 'Educação e Ensino',
    'saude': 'Saúde e Estética'
  };

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-50 border-blue-200 hover:bg-blue-100',
      purple: 'bg-purple-50 border-purple-200 hover:bg-purple-100',
      green: 'bg-green-50 border-green-200 hover:bg-green-100',
      orange: 'bg-orange-50 border-orange-200 hover:bg-orange-100',
      red: 'bg-red-50 border-red-200 hover:bg-red-100'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const getIconColorClasses = (color: string) => {
    const colors = {
      blue: 'text-blue-600',
      purple: 'text-purple-600',
      green: 'text-green-600',
      orange: 'text-orange-600',
      red: 'text-red-600'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {businessModels.map((model) => (
          <div key={model.id} className="space-y-4">
            <div className={`p-6 rounded-lg border-2 ${getColorClasses(model.color)} transition-all duration-200`}>
              <div className="flex items-center space-x-3 mb-4">
                <div className={`p-3 bg-white rounded-lg shadow-sm`}>
                  <model.icon className={`h-6 w-6 ${getIconColorClasses(model.color)}`} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {model.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {model.description}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700">
                  Setores disponíveis:
                </p>
                <div className="space-y-1">
                  {model.sectors.map((sector) => (
                    <button
                      key={sector}
                      onClick={() => onSelect(model.id, sector)}
                      className="w-full text-left px-3 py-2 text-sm bg-white rounded-md hover:bg-gray-50 transition-colors border border-gray-200"
                    >
                      {sectorNames[sector as keyof typeof sectorNames]}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">
          💡 Não tem certeza qual escolher?
        </h3>
        <div className="space-y-2 text-sm text-blue-800">
          <p><strong>E-commerce Low Ticket:</strong> Produtos de impulso, consumo rápido</p>
          <p><strong>E-commerce High Ticket:</strong> Produtos de consideração, alto valor</p>
          <p><strong>Inside Sales B2B:</strong> Vendas complexas, ciclo longo, múltiplos decisores</p>
          <p><strong>Inside Sales B2C:</strong> Vendas diretas para consumidor final</p>
          <p><strong>PDV:</strong> Vendas presenciais, loja física</p>
        </div>
      </div>
    </div>
  );
};

export default BusinessModelSelector;