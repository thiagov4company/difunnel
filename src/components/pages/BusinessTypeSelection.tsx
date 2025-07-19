import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Phone, Building2, Store } from 'lucide-react';

interface BusinessCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  path: string;
  onClick: (path: string) => void;
}

const BusinessCard: React.FC<BusinessCardProps> = ({ title, description, icon, path, onClick }) => (
  <div
    onClick={() => onClick(path)}
    className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow cursor-pointer border border-gray-100 hover:border-blue-500"
  >
    <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const BusinessTypeSelection: React.FC = () => {
  const navigate = useNavigate();

  const handleBusinessSelect = (path: string) => {
    navigate(path);
  };

  const businessTypes = [
    {
      title: 'E-commerce',
      description: 'Análise completa do funil de vendas online, do visitante à compra',
      icon: <ShoppingCart className="w-8 h-8 text-blue-600" />,
      path: '/analysis/ecommerce'
    },
    {
      title: 'Inside Sales B2C',
      description: 'Otimize seu funil de vendas por WhatsApp e atendimento direto',
      icon: <Phone className="w-8 h-8 text-blue-600" />,
      path: '/analysis/inside-sales-b2c'
    },
    {
      title: 'Inside Sales B2B',
      description: 'Análise especializada para vendas corporativas e ciclos longos',
      icon: <Building2 className="w-8 h-8 text-blue-600" />,
      path: '/analysis/inside-sales-b2b'
    },
    {
      title: 'PDV',
      description: 'Gestão de funil para pontos de venda físicos',
      icon: <Store className="w-8 h-8 text-blue-600" />,
      path: '/analysis/pdv'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
            Selecione seu Modelo de Negócio
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Escolha o tipo de negócio para receber uma análise personalizada do seu funil de vendas
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {businessTypes.map((business, index) => (
            <BusinessCard
              key={index}
              title={business.title}
              description={business.description}
              icon={business.icon}
              path={business.path}
              onClick={handleBusinessSelect}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BusinessTypeSelection; 