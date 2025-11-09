// Importa React para criar componentes funcionais
import React from 'react';
// Importa contexto global da aplicação (usuário, agendamentos, barbeiros, serviços)
import { useApp } from '../../context/AppContext';
// Importa ícones para exibição visual
import { Clock, Calendar, Tag } from 'lucide-react';

/**
 * Tela Inicial do Cliente
 * Exibe saudação, horário comercial, próximo agendamento e ofertas especiais.
 * Permite iniciar fluxo de agendamento.
 */

// Propriedades esperadas pelo componente: função para navegar entre telas
interface CustomerHomeProps {
  onNavigate: (view: string) => void; // callback para navegação
}

export const CustomerHome: React.FC<CustomerHomeProps> = ({ onNavigate }) => {
  // Extrai dados do contexto global
  const { currentUser, appointments, barbers, services } = useApp();

  // Filtra agendamentos futuros do cliente logado
  const userAppointments = appointments.filter(
    app => app.customerId === currentUser?.id && app.status === 'Scheduled'
  );

  // Seleciona o próximo agendamento do cliente (o mais próximo pela data/hora)
  const nextAppointment = userAppointments
    .sort((a, b) => new Date(a.date + ' ' + a.time).getTime() - new Date(b.date + ' ' + b.time).getTime())[0];

  // Função auxiliar para obter nome do barbeiro pelo id
  const getBarberName = (barberId: number) => {
    return barbers.find(b => b.id === barberId)?.name || 'Unknown';
  };

  // Função auxiliar para obter nome do serviço pelo id
  const getServiceName = (serviceId: number) => {
    return services.find(s => s.id === serviceId)?.name || 'Unknown';
  };

  // Função para formatar data para exibição
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  // Renderização do componente
  return (
    <div className="pb-24"> {/* Padding inferior para não cobrir pela BottomNav */}
      {/* Bloco de saudação e chamada */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-b-3xl p-6 mb-6">
        <h1 className="text-2xl font-bold text-white mb-1">
          Olá, {currentUser?.name?.split(' ')[0]} {/* Exibe primeiro nome do usuário */}
        </h1>
        <p className="text-gray-400">Pronto para seu próximo corte?</p>
      </div>

      <div className="px-4 space-y-4"> {/* Espaçamento entre blocos */}
        {/* Bloco de horário comercial */}
        <div className="bg-gray-900 rounded-2xl p-5 border border-gray-800">
          <div className="flex items-center gap-3 mb-3">
            <Clock className="text-cyan-400" size={24} /> {/* Ícone de relógio */}
            <h2 className="text-white font-semibold text-lg">Horário comercial</h2>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-gray-300">
              <span>Segunda - Feira</span>
              <span className="font-medium text-white">8:00 AM - 8:00 PM</span>
            </div>
            <div className="flex justify-between text-gray-300">
              <span>Sábado</span>
              <span className="font-medium text-white">9:00 AM - 6:00 PM</span>
            </div>
            <div className="flex justify-between text-gray-300">
              <span>Domingo</span>
              <span className="font-medium text-red-400">Fechado</span>
            </div>
          </div>
        </div>

        {/* Bloco do próximo agendamento, se existir */}
        {nextAppointment && (
          <div className="bg-gradient-to-br from-cyan-900/30 to-cyan-800/20 rounded-2xl p-5 border border-cyan-700/30">
              <div className="flex items-center gap-3 mb-4">
                <Calendar className="text-cyan-400" size={24} /> {/* Ícone de calendário */}
                <h2 className="text-white font-semibold text-lg">Seu Próximo Agendamento</h2>
              </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Barbeiro</span>
                <span className="text-white font-medium">{getBarberName(nextAppointment.barberId)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Serviço</span>
                <span className="text-white font-medium">{getServiceName(nextAppointment.serviceId)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Data</span>
                <span className="text-cyan-400 font-medium">{formatDate(nextAppointment.date)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Horário</span>
                <span className="text-cyan-400 font-medium">{nextAppointment.time}</span>
              </div>
            </div>
          </div>
        )}

        {/* Bloco de ofertas especiais */}
        <div className="bg-gray-900 rounded-2xl p-5 border border-gray-800">
          <div className="flex items-center gap-3 mb-4">
            <Tag className="text-cyan-400" size={24} /> {/* Ícone de tag */}
            <h2 className="text-white font-semibold text-lg">Ofertas Especiais</h2>
          </div>
          <div className="space-y-3">
            {/* Oferta 1: Combo */}
            <div className="bg-gradient-to-r from-cyan-500/10 to-transparent p-4 rounded-xl border border-cyan-500/20">
              <h3 className="text-white font-semibold mb-1">Combo Cabelo & Barba</h3>
              <p className="text-gray-400 text-sm mb-2">Economize $5 ao agendar ambos os serviços juntos</p>
              <p className="text-cyan-400 font-bold text-lg">$60.00</p>
            </div>
            {/* Oferta 2: Desconto primeira visita */}
            <div className="bg-gradient-to-r from-green-500/10 to-transparent p-4 rounded-xl border border-green-500/20">
              <h3 className="text-white font-semibold mb-1">Desconto na Primeira Visita</h3>
              <p className="text-gray-400 text-sm mb-2">Clientes novos ganham 10% de desconto no primeiro serviço</p>
              <p className="text-green-400 font-bold">Use o código: FIRST10</p>
            </div>
          </div>
        </div>

        {/* Botão para iniciar fluxo de agendamento */}
        <button
          onClick={() => onNavigate('schedule-barber')}
          className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-4 rounded-xl transition-colors duration-200"
        >
          Agendar Horário
        </button>
      </div>
    </div>
  );
};
