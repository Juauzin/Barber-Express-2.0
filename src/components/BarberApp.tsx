import React, { useState } from 'react';
import { BarberSchedule } from './barber/BarberSchedule';
import { ManageSchedule } from './barber/ManageSchedule';
import { AIFloatingButton } from './AIFloatingButton';

/**
 * Container da área do Barbeiro.
 * Alterna entre a visão de agenda (lista de compromissos) e o gerenciamento de disponibilidade.
 */

export const BarberApp: React.FC = () => {
  // Controla a view atual do barbeiro: 'schedule' (agenda) ou 'manage' (gerenciar horários)
  const [view, setView] = useState<'schedule' | 'manage'>('schedule');

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Renderiza a tela com base no estado 'view' */}
      {view === 'schedule' ? (
        <BarberSchedule onManageSchedule={() => setView('manage')} />
      ) : (
        <ManageSchedule onBack={() => setView('schedule')} />
      )}
      {/* Botão flutuante de IA sempre disponível */}
      <AIFloatingButton />
    </div>
  );
};
