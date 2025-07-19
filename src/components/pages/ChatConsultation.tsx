import React, { useState } from 'react';
import Header from '../common/Header';
import { Send, MessageCircle, Zap, Target, TrendingUp } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const ChatConsultation: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Olá! Sou seu assistente de análise de funil. Faça perguntas sobre suas métricas ou digite valores para análise rápida.',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const quickQuestions = [
    'WhatsApp → Oportunidade = 20%, está bom?',
    'Meu CTR está em 0.5%, como melhorar?',
    'Taxa de conversão 0.8% em e-commerce',
    'CAC de R$ 50 está alto?'
  ];

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const response = generateResponse(inputText);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const generateResponse = (input: string): string => {
    const lowerInput = input.toLowerCase();

    if (lowerInput.includes('whatsapp') && lowerInput.includes('oportunidade')) {
      return '🎯 Para WhatsApp → Oportunidade com 20%:\n\n✅ **Status**: Abaixo da média (benchmark: 25%)\n\n🔧 **Recomendações**:\n• Responda em até 5 minutos\n• Use scripts de qualificação estruturados\n• Implemente chatbots para primeira resposta\n• Treine equipe em técnicas consultivas\n\n📈 **Potencial**: Aumentar para 25% geraria +25% mais oportunidades!';
    }

    if (lowerInput.includes('ctr')) {
      return '📊 Para CTR de 0.5%:\n\n❌ **Status**: Abaixo da média (benchmark: 0.8%+)\n\n🚀 **Melhorias urgentes**:\n• Teste novos criativos (imagens/vídeos)\n• Melhore headlines com gatilhos mentais\n• Segmente públicos mais específicos\n• Use social proof nos anúncios\n• Teste diferentes formatos (carrossel, stories)\n\n💡 **Dica**: Tente pelo menos 3 criativos diferentes por público!';
    }

    if (lowerInput.includes('conversão') || lowerInput.includes('0.8%')) {
      return '🛒 Taxa de conversão 0.8% em e-commerce:\n\n⚠️ **Status**: Abaixo da média (benchmark: 1-2%)\n\n🔧 **Soluções prioritárias**:\n• Melhore UX/UI mobile\n• Otimize fotos e descrições de produtos\n• Adicione avaliações e prova social\n• Simplifique processo de checkout\n• Implemente pop-ups de desconto\n\n📈 **Impacto**: Subir para 1.5% = +87% mais vendas!';
    }

    if (lowerInput.includes('cac')) {
      return '💰 CAC de R$ 50:\n\n🤔 **Análise**: Depende do seu LTV (Lifetime Value)\n\n📋 **Regra geral**:\n• CAC deve ser < 1/3 do LTV\n• Payback em até 12 meses\n• ROAS > 3:1 para ser sustentável\n\n🎯 **Para reduzir CAC**:\n• Melhore segmentação\n• Otimize criativos\n• Teste públicos lookalike\n• Aumente taxa de conversão\n\n❓ **Pergunta**: Qual é seu ticket médio e LTV?';
    }

    return '🤖 Entendi sua pergunta! Para dar uma resposta mais precisa, preciso de algumas informações:\n\n📊 **Me conte**:\n• Qual é o seu modelo de negócio?\n• Qual métrica específica você quer analisar?\n• Qual é o valor atual?\n\n💡 **Exemplos de perguntas**:\n• "Meu CTR está em 0.5%, como melhorar?"\n• "Taxa de conversão 0.8% em e-commerce"\n• "CAC de R$ 50 está alto?"\n\nVamos analisar juntos! 🚀';
  };

  const handleQuickQuestion = (question: string) => {
    setInputText(question);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg h-[600px] flex flex-col">
          {/* Chat Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-full">
                <MessageCircle className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Chat Consultoria
                </h2>
                <p className="text-sm text-gray-600">
                  Consultas rápidas sobre métricas e funis
                </p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[70%] p-3 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <p className="whitespace-pre-line">{message.text}</p>
                  <p className={`text-xs mt-1 ${
                    message.sender === 'user' ? 'text-blue-200' : 'text-gray-500'
                  }`}>
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-900 p-3 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Quick Questions */}
          <div className="p-4 border-t border-gray-200">
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Perguntas rápidas:</p>
              <div className="flex flex-wrap gap-2">
                {quickQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickQuestion(question)}
                    className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded-full transition-colors"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>

            {/* Input */}
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Digite sua pergunta sobre métricas..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputText.trim() || isTyping}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-full">
                <Zap className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Consultas Hoje</p>
                <p className="text-lg font-semibold text-gray-900">12</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-full">
                <Target className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Gargalos Identificados</p>
                <p className="text-lg font-semibold text-gray-900">8</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 rounded-full">
                <TrendingUp className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Melhorias Sugeridas</p>
                <p className="text-lg font-semibold text-gray-900">15</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatConsultation;