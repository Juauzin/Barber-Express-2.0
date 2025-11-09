// Importa React para criar componentes funcionais
import React from 'react';
// Importa ícone para exibição visual
import { CheckCircle } from 'lucide-react';

/**
 * Passo 4 do Agendamento: Confirmação de Sucesso
 * Exibe mensagem positiva e opções para ver agendamentos ou voltar ao início.
 */

// Propriedades esperadas pelo componente: callbacks para ver agendamentos e voltar ao início
interface ScheduleSuccessProps {
  onViewAppointments: () => void; // callback para ver agendamentos
  onGoHome: () => void; // callback para voltar ao início
}

export const ScheduleSuccess: React.FC<ScheduleSuccessProps> = ({ onViewAppointments, onGoHome }) => {
  // Renderização do componente
  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-6"> {/* Centraliza conteúdo */}
      <div className="max-w-md w-full text-center space-y-6">
        {/* Ícone de sucesso */}
        <div className="flex justify-center">
          <div className="bg-green-500/20 rounded-full p-6">
            <CheckCircle className="text-green-400" size={80} />
          </div>
        </div>

        {/* Mensagem de confirmação */}
        <div>
          <h1 className="text-3xl font-bold text-white mb-3">Agendamento Confirmado!</h1>
          <p className="text-gray-400 text-lg">
            Seu agendamento foi realizado com sucesso. Estamos ansiosos para vê-lo!
          </p>
        </div>

        {/* Botões de ação */}
        <div className="space-y-3 pt-4">
          <button
            onClick={onViewAppointments}
            className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-4 rounded-xl transition-colors duration-200"
          >
            Ver Meus Agendamentos
          </button>
          <button
            onClick={onGoHome}
            className="w-full bg-gray-800 hover:bg-gray-700 text-white font-semibold py-4 rounded-xl transition-colors duration-200"
          >
            Voltar para Início
          </button>
        </div>
      </div>
    </div>
  );
};
