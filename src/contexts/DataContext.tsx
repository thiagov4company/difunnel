import React, { createContext, useContext, useState } from 'react';

export interface FunnelData {
  id: string;
  businessModel: 'ecommerce-low' | 'ecommerce-high' | 'inside-sales-b2b' | 'inside-sales-b2c' | 'pdv';
  sector: string;
  metrics: Record<string, number>;
  results?: FunnelResults;
  createdAt: Date;
  updatedAt: Date;
}

export interface FunnelResults {
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
}

interface DataContextType {
  funnels: FunnelData[];
  currentFunnel: FunnelData | null;
  setCurrentFunnel: (funnel: FunnelData | null) => void;
  saveFunnel: (funnel: FunnelData) => void;
  deleteFunnel: (id: string) => void;
  getMarketBenchmark: (businessModel: string, sector: string, metric: string) => number;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

const marketBenchmarks = {
  'ecommerce-low': {
    'geral': {
      'visitors_to_cart': 10,
      'cart_to_checkout': 10,
      'checkout_to_purchase': 20,
      'visitors_to_purchase': 2,
      'meta_ctr': 0.8,
      'google_ctr': 3,
      'meta_cpc': 1,
      'google_cpc': 2
    }
  },
  'ecommerce-high': {
    'geral': {
      'visitors_to_cart': 7.7,
      'cart_to_checkout': 10,
      'checkout_to_purchase': 20,
      'visitors_to_purchase': 0.5,
      'meta_ctr': 0.8,
      'google_ctr': 3,
      'meta_cpc': 1,
      'google_cpc': 2
    }
  },
  'inside-sales-b2b': {
    'agronegocio': { 'lead_to_opportunity': 20, 'opportunity_to_sale': 2 },
    'marketing': { 'lead_to_opportunity': 6, 'opportunity_to_sale': 5 },
    'consultoria': { 'lead_to_opportunity': 10, 'opportunity_to_sale': 10 },
    'educacao': { 'lead_to_opportunity': 14, 'opportunity_to_sale': 13 },
    'saude': { 'lead_to_opportunity': 14, 'opportunity_to_sale': 12 }
  },
  'inside-sales-b2c': {
    'geral': {
      'whatsapp_to_sale': 4,
      'whatsapp_to_opportunity': 25,
      'opportunity_to_attendance': 30,
      'attendance_to_sale': 30
    }
  },
  'pdv': {
    'geral': {
      'lead_to_opportunity': 23,
      'opportunity_to_sale': 21,
      'lead_to_sale': 5
    }
  }
};

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [funnels, setFunnels] = useState<FunnelData[]>([]);
  const [currentFunnel, setCurrentFunnel] = useState<FunnelData | null>(null);

  const saveFunnel = (funnel: FunnelData) => {
    setFunnels(prev => {
      const existingIndex = prev.findIndex(f => f.id === funnel.id);
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = { ...funnel, updatedAt: new Date() };
        return updated;
      }
      return [...prev, { ...funnel, createdAt: new Date(), updatedAt: new Date() }];
    });
  };

  const deleteFunnel = (id: string) => {
    setFunnels(prev => prev.filter(f => f.id !== id));
    if (currentFunnel?.id === id) {
      setCurrentFunnel(null);
    }
  };

  const getMarketBenchmark = (businessModel: string, sector: string, metric: string): number => {
    const model = marketBenchmarks[businessModel as keyof typeof marketBenchmarks];
    if (!model) return 0;
    
    const sectorData = model[sector as keyof typeof model] || model['geral' as keyof typeof model];
    if (!sectorData) return 0;
    
    return sectorData[metric as keyof typeof sectorData] || 0;
  };

  return (
    <DataContext.Provider value={{
      funnels,
      currentFunnel,
      setCurrentFunnel,
      saveFunnel,
      deleteFunnel,
      getMarketBenchmark
    }}>
      {children}
    </DataContext.Provider>
  );
};