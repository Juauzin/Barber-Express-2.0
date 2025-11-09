// Importa React e hook de estado para controlar inputs do usuário
import React, { useState } from 'react';
// Importa contexto global da aplicação (barbeiros, horários, serviços, agendamentos)
import { useApp } from '../../context/AppContext';
// Importa ícones para UI
import { ChevronLeft, Calendar } from 'lucide-react';
// Importa tipo Service para tipagem dos serviços
import { Service } from '../../types';

/**
 * Passo 2 do Agendamento: Seleção de Data, Horário e Serviços
 * Permite escolher data, horário disponível e serviços desejados para o barbeiro selecionado.
 * Exibe validação de disponibilidade e preço total.
 */

// Props esperadas pelo componente: id do barbeiro, callbacks para avançar/voltar
interface ScheduleDateTimeProps {
  barberId: number; // id do barbeiro selecionado
  onNext: (date: string, time: string, selectedServices: Service[]) => void; // callback para avançar
  onBack: () => void; // callback para voltar
}

export const ScheduleDateTime: React.FC<ScheduleDateTimeProps> = ({ barberId, onNext, onBack }) => {
  // Extrai dados globais do contexto (slots disponíveis, serviços, barbeiros, agendamentos)
  const { availableSlots, services, barbers, appointments } = useApp();
  // Estado para data selecionada (string no formato yyyy-mm-dd)
  const [selectedDate, setSelectedDate] = useState<string>('');
  // Estado para horário selecionado (string, ex: '14:00')
  const [selectedTime, setSelectedTime] = useState<string>('');
  // Estado para lista de serviços selecionados (array de ids)
  const [selectedServices, setSelectedServices] = useState<number[]>([]);

  // Busca o barbeiro pelo id recebido via props
  const barber = barbers.find(b => b.id === barberId);
  // Filtra os slots disponíveis para o barbeiro selecionado
  const barberSlots = availableSlots.filter(slot => slot.barberId === barberId);

  // Extrai e ordena as datas disponíveis para o barbeiro (sem repetições)
  const dates = Array.from(new Set(barberSlots.map(slot => slot.date))).sort();

  // Função que retorna os horários disponíveis para uma data específica
  const getAvailableHours = (date: string) => {
    const slot = barberSlots.find(s => s.date === date);
    if (!slot) return [];

  // Filtra horários já agendados para evitar conflitos
    const bookedTimes = appointments
      .filter(app => app.barberId === barberId && app.date === date && app.status === 'Scheduled')
      .map(app => app.time);

  // Retorna apenas horários livres para seleção
    return slot.hours.filter(hour => !bookedTimes.includes(hour));
  };

  // Lista de horários disponíveis para a data selecionada (usado na UI)
  const availableHours = selectedDate ? getAvailableHours(selectedDate) : [];

  // Adiciona ou remove serviço da lista de selecionados (toggle)
  const toggleService = (serviceId: number) => {
    setSelectedServices(prev =>
      prev.includes(serviceId)
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  // Lista de objetos de serviço selecionados (filtra pelo id)
  const selectedServiceObjects = services.filter(s => selectedServices.includes(s.id));
  // Soma total dos preços dos serviços selecionados (para exibir na UI)
  const totalPrice = selectedServiceObjects.reduce((sum, s) => sum + s.price, 0);

  // Handler para avançar para o próximo passo do agendamento (chama onNext)
  const handleContinue = () => {
    if (selectedDate && selectedTime && selectedServices.length > 0) {
      onNext(selectedDate, selectedTime, selectedServiceObjects);
    }
  };

  // Formata data para exibição amigável na UI
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', weekday: 'short' });
  };

  // Verifica se todos os campos obrigatórios estão preenchidos para habilitar o botão de continuar
  const canContinue = selectedDate && selectedTime && selectedServices.length > 0;

  // Renderização do componente JSX
  return (
    <div className="min-h-screen bg-gray-950 pb-24">
  {/* Barra superior fixa com botão de voltar e título */}
  <div className="bg-gray-900 p-4 flex items-center gap-4 border-b border-gray-800">
  {/* Botão para voltar ao passo anterior */}
  <button onClick={onBack} className="text-gray-400 hover:text-white">
          <ChevronLeft size={24} />
        </button>
  <h1 className="text-xl font-bold text-white">Agende Seu Corte</h1>
      </div>

  {/* Bloco principal de seleção de data, horário e serviços */}
  <div className="p-6 space-y-6">
  {/* Card do barbeiro selecionado */}
  <div className="bg-gray-900 rounded-2xl p-5 border border-gray-800">
          <div className="flex items-center gap-3 mb-1">
            <img src={barber?.photoUrl} alt={barber?.name} className="w-12 h-12 rounded-full object-cover" />
            <div>
              <h3 className="text-white font-semibold">{barber?.name}</h3>
              <p className="text-gray-400 text-sm">Barbeiro selecionado</p>
            </div>
          </div>
        </div>

  {/* Seleção de data */}
  <div>
          <div className="flex items-center gap-2 mb-3">
            <Calendar className="text-cyan-400" size={20} />
            <h2 className="text-white font-semibold">Selecionar Data</h2>
          </div>
          {/* Lista de datas disponíveis como botões */}
          <div className="grid grid-cols-3 gap-3">
            {dates.map((date) => (
              <button
                key={date}
                onClick={() => {
                  setSelectedDate(date);
                  setSelectedTime('');
                }}
                className={`p-3 rounded-xl border-2 transition-all duration-200 ${
                  selectedDate === date
                    ? 'border-cyan-500 bg-cyan-500/10'
                    : 'border-gray-800 bg-gray-900 hover:border-gray-700'
                }`}
              >
                <div className="text-center">
                  <p className="text-white font-semibold text-sm">{formatDate(date)}</p>
                </div>
              </button>
            ))}
          </div>
  </div>

    {/* Seleção de horário, aparece só após escolher data */}
    {selectedDate && (
          <div>
            <h2 className="text-white font-semibold mb-3">Selecionar Horário</h2>
            {/* Lista de horários disponíveis como botões */}
            <div className="grid grid-cols-4 gap-2">
              {availableHours.map((hour) => (
                <button
                  key={hour}
                  onClick={() => setSelectedTime(hour)}
                  className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                    selectedTime === hour
                      ? 'border-cyan-500 bg-cyan-500/10 text-cyan-400'
                      : 'border-gray-800 bg-gray-900 text-gray-300 hover:border-gray-700'
                  }`}
                >
                  <p className="text-sm font-medium">{hour}</p>
                </button>
              ))}
            </div>
          </div>
        )}

  {/* Seleção de serviços */}
  <div>
          <h2 className="text-white font-semibold mb-3">Selecionar Serviços</h2>
          <div className="space-y-3">
            {services.map((service) => (
              <button
                key={service.id}
                onClick={() => toggleService(service.id)}
                className={`w-full bg-gray-900 rounded-xl p-4 border-2 transition-all duration-200 ${
                  selectedServices.includes(service.id)
                    ? 'border-cyan-500 bg-cyan-500/10'
                    : 'border-gray-800 hover:border-gray-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="text-left">
                    <h3 className="text-white font-medium mb-1">{service.name}</h3>
                    <p className="text-gray-400 text-sm">{service.durationMinutes} minutos</p>
                  </div>
                  <div className="text-right">
                    <p className="text-cyan-400 font-bold">${service.price.toFixed(2)}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

  {/* Exibe o total dos serviços selecionados */}
  {selectedServices.length > 0 && (
          <div className="bg-gradient-to-r from-cyan-900/30 to-cyan-800/20 rounded-xl p-4 border border-cyan-700/30">
            <div className="flex justify-between items-center">
              <span className="text-white font-semibold">Preço Total:</span>
              <span className="text-cyan-400 font-bold text-xl">${totalPrice.toFixed(2)}</span>
            </div>
          </div>
        )}

  {/* Botão para continuar para o próximo passo */}
  <button
          onClick={handleContinue}
          disabled={!canContinue}
          className={`w-full py-4 rounded-xl font-semibold transition-all duration-200 ${
            canContinue
              ? 'bg-cyan-500 hover:bg-cyan-600 text-white'
              : 'bg-gray-800 text-gray-500 cursor-not-allowed'
          }`}
        >
          Continuar para Resumo
        </button>
      </div>
    </div>
  );
};
