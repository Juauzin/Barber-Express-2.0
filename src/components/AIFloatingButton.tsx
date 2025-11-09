import React from 'react';
import { Sparkles } from 'lucide-react';

/**
 * Botão flutuante que abre uma página externa de IA (chat/assistente).
 * Fica fixo no canto inferior direito, acima da BottomNav.
 */

export const AIFloatingButton: React.FC = () => {
  // Ao clicar, abre o endereço configurado em uma nova aba/janela.
  const handleClick = () => {
    window.open('http://127.0.0.1:5000', '_blank');
  };

  return (
    <button
      onClick={handleClick}
      // Ajuste de posição: soma 2cm ao bottom utilitário (bottom-6 ~ 1.5rem)
      style={{ bottom: 'calc(1.5rem + 2cm)' }}
      className="fixed bottom-6 right-6 bg-cyan-500 hover:bg-cyan-600 text-white rounded-full px-6 py-4 shadow-lg flex items-center gap-2 transition-all duration-300 hover:scale-105 z-50 font-medium"
    >
      <Sparkles size={20} />
      <span>Utilize nossa IA</span>
    </button>
  );
};
