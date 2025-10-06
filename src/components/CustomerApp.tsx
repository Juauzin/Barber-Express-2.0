// Biblioteca React e hook de estado
import React, { useState } from 'react';
// Hook de contexto da aplicação (dados globais: usuários, agendamentos, ações)
import { useApp } from '../context/AppContext';
// Componentes da área do cliente (telas e navegação)
import { CustomerHome } from './customer/CustomerHome';
import { BottomNav } from './customer/BottomNav';
import { ScheduleBarber } from './customer/ScheduleBarber';
import { ScheduleDateTime } from './customer/ScheduleDateTime';
import { ScheduleSummary } from './customer/ScheduleSummary';
import { ScheduleSuccess } from './customer/ScheduleSuccess';
import { MyAppointments } from './customer/MyAppointments';
import { MyProfile } from './customer/MyProfile';
import { Favorites } from './customer/Favorites';
// Botão flutuante (ex.: IA) presente em todas as telas do cliente
import { AIFloatingButton } from './AIFloatingButton';
// Tipos compartilhados (ex.: Service)
import { Service } from '../types';

export const CustomerApp: React.FC = () => {
  // Acesso a ações/dados globais via contexto (ex.: adicionar agendamento, usuário atual)
  const { addAppointment, currentUser } = useApp();

  // Estado que controla qual 'view' (tela) está sendo exibida
  // Ex: 'home', 'appointments', 'schedule-barber', 'schedule-datetime', etc.
  const [view, setView] = useState('home');

  // Estado temporário que armazena os dados do fluxo de agendamento
  // barberId: id do barbeiro selecionado
  // date: data escolhida
  // time: horário escolhido
  // selectedServices: lista de serviços escolhidos pelo cliente
  const [scheduleState, setScheduleState] = useState({
    barberId: 0,
    date: '',
    time: '',
    selectedServices: [] as Service[],
  });

  // Handler chamado quando o usuário escolhe um barbeiro e avança
  // Atualiza o estado de agendamento com o barbeiro selecionado
  // e navega para a tela de escolher data/horário
  const handleScheduleBarberNext = (barberId: number) => {
    setScheduleState({ ...scheduleState, barberId });
    setView('schedule-datetime');
  };

  // Handler chamado quando o usuário escolhe data, horário e serviços
  // Atualiza o estado de agendamento e navega para a tela de resumo
  const handleScheduleDateTimeNext = (date: string, time: string, selectedServices: Service[]) => {
    setScheduleState({ ...scheduleState, date, time, selectedServices });
    setView('schedule-summary');
  };

  // Quando o usuário confirma o agendamento no resumo, criamos um appointment
  // Para cada serviço selecionado é criado um registro separado (simplificação do modelo)
  // Depois de criar os agendamentos, navegamos para a tela de sucesso
  const handleConfirmAppointment = () => {
    if (currentUser) {
      scheduleState.selectedServices.forEach((service) => {
        addAppointment({
          customerId: currentUser.id,
          barberId: scheduleState.barberId,
          serviceId: service.id,
          date: scheduleState.date,
          time: scheduleState.time,
          status: 'Scheduled',
        });
      });
      setView('schedule-success');
    }
  };

  // Função que decide qual componente/tela renderizar com base no estado 'view'
  // Cada case retorna o componente correspondente, passando handlers e dados necessários
  const renderView = () => {
    switch (view) {
      case 'home':
        // Tela inicial do cliente
        return <CustomerHome onNavigate={setView} />;
      case 'appointments':
        // Lista de agendamentos do cliente
        return <MyAppointments onBack={() => setView('home')} />;
      case 'favorites':
        // Tela de favoritos
        return <Favorites onBack={() => setView('home')} />;
      case 'profile':
        // Perfil do usuário
        return <MyProfile onBack={() => setView('home')} />;
      case 'schedule-barber':
        // Escolher barbeiro
        return (
          <ScheduleBarber
            onNext={handleScheduleBarberNext}
            onBack={() => setView('home')}
          />
        );
      case 'schedule-datetime':
        // Escolher data e horário para o barbeiro selecionado
        return (
          <ScheduleDateTime
            barberId={scheduleState.barberId}
            onNext={handleScheduleDateTimeNext}
            onBack={() => setView('schedule-barber')}
          />
        );
      case 'schedule-summary':
        // Resumo antes de confirmar o agendamento
        return (
          <ScheduleSummary
            barberId={scheduleState.barberId}
            date={scheduleState.date}
            time={scheduleState.time}
            selectedServices={scheduleState.selectedServices}
            onConfirm={handleConfirmAppointment}
            onBack={() => setView('schedule-datetime')}
          />
        );
      case 'schedule-success':
        // Tela de sucesso após criar o(s) agendamento(s)
        return (
          <ScheduleSuccess
            onViewAppointments={() => setView('appointments')}
            onGoHome={() => setView('home')}
          />
        );
      default:
        // Fallback para a tela inicial
        return <CustomerHome onNavigate={setView} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Renderiza a view atual decidida por renderView() */}
      {renderView()}

      {/* Barra de navegação inferior: exibida em todas as telas exceto na tela de sucesso */}
      {!view.includes('schedule-success') && <BottomNav activeView={view} onNavigate={setView} />}

      {/* Botão flutuante (ex.: recurso de IA) sempre presente */}
      <AIFloatingButton />
    </div>
  );
};
