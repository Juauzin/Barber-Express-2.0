// Importa React para criar componentes funcionais
import React, { useState } from 'react';
// Importa contexto global da aplicação (barbeiros)
import { useApp } from '../../context/AppContext';
// Importa ícones para navegação
import { ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * Passo 1 do Agendamento: Seleção de Barbeiro
 * Permite escolher um barbeiro para iniciar o fluxo de agendamento.
 * Exibe cards com foto, nome e avaliação.
 */

// Propriedades esperadas pelo componente: callbacks para avançar e voltar
interface ScheduleBarberProps {
  onNext: (barberId: number) => void; // callback para avançar
  onBack: () => void; // callback para voltar
}

export const ScheduleBarber: React.FC<ScheduleBarberProps> = ({ onNext, onBack }) => {
  // Extrai lista de barbeiros do contexto
  const { barbers } = useApp();
  // Estado para barbeiro selecionado
  const [selectedBarber, setSelectedBarber] = useState<number | null>(null);

  // Função para continuar para o próximo passo do agendamento
  const handleContinue = () => {
    if (selectedBarber !== null) {
      onNext(selectedBarber);
    }
  };

  // Renderização do componente
  return (
    <div className="min-h-screen bg-gray-950 pb-24"> {/* Altura mínima e padding inferior */}
      {/* Barra superior com botão de voltar e título */}
      <div className="bg-gray-900 p-4 flex items-center gap-4 border-b border-gray-800">
        <button onClick={onBack} className="text-gray-400 hover:text-white"> {/* Botão de voltar */}
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-xl font-bold text-white">Selecione um Barbeiro</h1>
      </div>

      {/* Bloco principal: lista de barbeiros */}
      <div className="p-6">
        <p className="text-gray-400 mb-6 text-center">Escolha seu barbeiro preferido para o agendamento</p>

        <div className="space-y-4">
          {/* Mapeia cada barbeiro para um card/botão */}
          {barbers.map((barber) => (
            <button
              key={barber.id}
              onClick={() => setSelectedBarber(barber.id)} // Seleciona barbeiro
              className={`w-full bg-gray-900 rounded-2xl p-5 border-2 transition-all duration-200 ${
                selectedBarber === barber.id
                  ? 'border-cyan-500 bg-cyan-500/10'
                  : 'border-gray-800 hover:border-gray-700'
              }`}
            >
              <div className="flex items-center gap-4">
                <img
                  src={barber.photoUrl}
                  alt={barber.name}
                  className="w-20 h-20 rounded-full object-cover"
                />
                <div className="flex-1 text-left">
                  <h3 className="text-white font-semibold text-lg mb-1">{barber.name}</h3>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      {/* Renderiza estrelas de avaliação (exemplo visual) */}
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={i < Math.floor(barber.rating) ? 'text-yellow-400' : 'text-gray-600'}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                    <span className="text-gray-400 text-sm">({barber.rating.toFixed(1)})</span>
                  </div>
                </div>
                {selectedBarber === barber.id && (
                  <div className="w-6 h-6 bg-cyan-500 rounded-full flex items-center justify-center">
                    <ChevronRight size={16} className="text-white" />
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>

        <button
          onClick={handleContinue}
          disabled={selectedBarber === null}
          className={`w-full mt-8 py-4 rounded-xl font-semibold transition-all duration-200 ${
            selectedBarber !== null
              ? 'bg-cyan-500 hover:bg-cyan-600 text-white'
              : 'bg-gray-800 text-gray-500 cursor-not-allowed'
          }`}
        >
          Continuar
        </button>
      </div>
    </div>
  );
};
