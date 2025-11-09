import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ChevronLeft, Calendar, Plus, Trash2 } from 'lucide-react';

/**
 * Tela de Gerenciamento de Disponibilidade do Barbeiro
 * Permite adicionar, visualizar e remover dias/horários disponíveis para agendamento.
 */

interface ManageScheduleProps {
  onBack: () => void;
}

export const ManageSchedule: React.FC<ManageScheduleProps> = ({ onBack }) => {
  const { currentUser, availableSlots, updateAvailableSlots } = useApp();
  const [selectedDate, setSelectedDate] = useState('');
  const [startTime, setStartTime] = useState('08:00');
  const [endTime, setEndTime] = useState('18:00');

  // Filtra os slots disponíveis do barbeiro logado
  const barberSlots = availableSlots.filter(slot => slot.barberId === currentUser?.id);

  // Gera array de horários entre início e fim (ex.: 08:00 até 18:00)
  const generateTimeSlots = (start: string, end: string): string[] => {
    const slots: string[] = [];
    const startHour = parseInt(start.split(':')[0]);
    const endHour = parseInt(end.split(':')[0]);

    for (let hour = startHour; hour < endHour; hour++) {
      slots.push(`${hour.toString().padStart(2, '0')}:00`);
    }

    return slots;
  };

  // Adiciona um novo dia disponível para o barbeiro
  const handleAddSchedule = () => {
    if (!selectedDate || !currentUser) return;

    const timeSlots = generateTimeSlots(startTime, endTime);
    updateAvailableSlots(currentUser.id, selectedDate, timeSlots);
    setSelectedDate('');
  };

  // Remove todos os horários de um dia específico
  const handleRemoveSchedule = (date: string) => {
    if (currentUser) {
      updateAvailableSlots(currentUser.id, date, []);
    }
  };

  // Formata data para exibição amigável
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  return (
    <div className="min-h-screen bg-gray-950 pb-24">
      <div className="bg-gray-900 p-4 flex items-center gap-4 border-b border-gray-800">
        <button onClick={onBack} className="text-gray-400 hover:text-white">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-xl font-bold text-white">Gerenciar Agenda</h1>
      </div>

      <div className="p-6 space-y-6">
        <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
          <div className="flex items-center gap-2 mb-4">
            <Plus className="text-cyan-400" size={20} />
            <h2 className="text-white font-semibold text-lg">Adicionar Dia Disponível</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-gray-300 mb-2 text-sm font-medium">Selecionar Data</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={getTomorrowDate()}
                className="w-full bg-gray-800 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-300 mb-2 text-sm font-medium">Hora de Início</label>
                <select
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="w-full bg-gray-800 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                >
                  {Array.from({ length: 12 }, (_, i) => i + 6).map(hour => {
                    const time = `${hour.toString().padStart(2, '0')}:00`;
                    return <option key={time} value={time}>{time}</option>;
                  })}
                </select>
              </div>

              <div>
                <label className="block text-gray-300 mb-2 text-sm font-medium">Hora de Término</label>
                <select
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="w-full bg-gray-800 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                >
                  {Array.from({ length: 12 }, (_, i) => i + 10).map(hour => {
                    const time = `${hour.toString().padStart(2, '0')}:00`;
                    return <option key={time} value={time}>{time}</option>;
                  })}
                </select>
              </div>
            </div>

            <button
              onClick={handleAddSchedule}
              disabled={!selectedDate}
              className={`w-full py-3 rounded-lg font-semibold transition-colors duration-200 ${
                selectedDate
                  ? 'bg-cyan-500 hover:bg-cyan-600 text-white'
                  : 'bg-gray-800 text-gray-500 cursor-not-allowed'
              }`}
            >
              Adicionar Agenda
            </button>
          </div>
        </div>

        <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="text-cyan-400" size={20} />
            <h2 className="text-white font-semibold text-lg">Seus Dias Disponíveis</h2>
          </div>

          {barberSlots.length === 0 ? (
            <p className="text-gray-400 text-center py-8">Nenhum dia disponível definido ainda</p>
          ) : (
            <div className="space-y-3">
              {barberSlots
                .filter(slot => slot.hours.length > 0)
                .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                .map((slot) => (
                  <div
                    key={slot.date}
                    className="bg-gray-800 rounded-xl p-4 flex items-center justify-between"
                  >
                    <div>
                      <p className="text-white font-medium mb-1">{formatDate(slot.date)}</p>
                      <p className="text-gray-400 text-sm">
                        {slot.hours.length} horários disponíveis
                      </p>
                      <p className="text-cyan-400 text-xs mt-1">
                        {slot.hours[0]} - {slot.hours[slot.hours.length - 1]}
                      </p>
                    </div>
                    <button
                      onClick={() => handleRemoveSchedule(slot.date)}
                      className="bg-red-500/10 hover:bg-red-500/20 text-red-400 p-2 rounded-lg transition-colors duration-200"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
