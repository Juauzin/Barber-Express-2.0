import React from 'react';
import { useApp } from '../../context/AppContext';
import { ChevronLeft, Calendar, Clock, Scissors, DollarSign } from 'lucide-react';
import { Service } from '../../types';

interface ScheduleSummaryProps {
  barberId: number;
  date: string;
  time: string;
  selectedServices: Service[];
  onConfirm: () => void;
  onBack: () => void;
}

export const ScheduleSummary: React.FC<ScheduleSummaryProps> = ({
  barberId,
  date,
  time,
  selectedServices,
  onConfirm,
  onBack,
}) => {
  const { barbers } = useApp();
  const barber = barbers.find(b => b.id === barberId);
  const totalPrice = selectedServices.reduce((sum, s) => sum + s.price, 0);
  const totalDuration = selectedServices.reduce((sum, s) => sum + s.durationMinutes, 0);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-950 pb-24">
      <div className="bg-gray-900 p-4 flex items-center gap-4 border-b border-gray-800">
        <button onClick={onBack} className="text-gray-400 hover:text-white">
          <ChevronLeft size={24} />
        </button>
  <h1 className="text-xl font-bold text-white">Resumo</h1>
      </div>

      <div className="p-6 space-y-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-white mb-2">Revise Seu Agendamento</h2>
          <p className="text-gray-400">Por favor confirme todos os detalhes antes de confirmar</p>
        </div>

        <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800 space-y-4">
          <div className="flex items-center gap-4 pb-4 border-b border-gray-800">
            <img
              src={barber?.photoUrl}
              alt={barber?.name}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <p className="text-gray-400 text-sm">Barbeiro</p>
              <h3 className="text-white font-semibold text-lg">{barber?.name}</h3>
              <div className="flex items-center gap-1 mt-1">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={i < Math.floor(barber?.rating || 0) ? 'text-yellow-400' : 'text-gray-600'}
                  >
                    ★
                  </span>
                ))}
                <span className="text-gray-400 text-sm ml-1">({barber?.rating.toFixed(1)})</span>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Calendar className="text-cyan-400 mt-1" size={20} />
            <div className="flex-1">
              <p className="text-gray-400 text-sm">Data</p>
              <p className="text-white font-medium">{formatDate(date)}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Clock className="text-cyan-400 mt-1" size={20} />
            <div className="flex-1">
              <p className="text-gray-400 text-sm">Horário</p>
              <p className="text-white font-medium">{time}</p>
              <p className="text-gray-500 text-sm">Duração: {totalDuration} minutos</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Scissors className="text-cyan-400 mt-1" size={20} />
            <div className="flex-1">
              <p className="text-gray-400 text-sm mb-2">Serviços</p>
              <div className="space-y-2">
                {selectedServices.map((service) => (
                  <div key={service.id} className="flex justify-between items-center bg-gray-800 rounded-lg p-3">
                    <span className="text-white">{service.name}</span>
                    <span className="text-cyan-400 font-medium">${service.price.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-800">
            <div className="flex items-center justify-between bg-gradient-to-r from-cyan-900/30 to-cyan-800/20 rounded-xl p-4 border border-cyan-700/30">
              <div className="flex items-center gap-2">
                <DollarSign className="text-cyan-400" size={20} />
                <span className="text-white font-semibold">Preço Total</span>
              </div>
              <span className="text-cyan-400 font-bold text-2xl">${totalPrice.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={onConfirm}
            className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-4 rounded-xl transition-colors duration-200"
          >
            Confirmar Agendamento
          </button>
          <button
            onClick={onBack}
            className="w-full bg-gray-800 hover:bg-gray-700 text-white font-semibold py-4 rounded-xl transition-colors duration-200"
          >
            Voltar
          </button>
        </div>
      </div>
    </div>
  );
};
