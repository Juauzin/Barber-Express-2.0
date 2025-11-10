// Importa as bibliotecas principais do React, incluindo o hook 'useState'.
import React, { useState } from 'react';

// Importa o componente de agendamento da barbearia.
import { BarberSchedule } from './barber/BarberSchedule';

// Importa o componente de gerenciamento da agenda.
import { ManageSchedule } from './barber/ManageSchedule';

// Importa o componente do botão flutuante de IA.
import { AIFloatingButton } from './AIFloatingButton';
import { MyProfile } from './customer/MyProfile';
import { BarberBottomNav } from './barber/BarberBottomNav';


// Exporta e define o componente principal 'BarberApp' como um Componente Funcional (FC).
export const BarberApp: React.FC = () => {
  // Cria uma variável de estado chamada 'view' e uma função 'setView' para atualizá-la.
  // O valor inicial de 'view' é 'schedule'.
  const [view, setView] = useState<'schedule' | 'manage' | 'profile'>('schedule');

  const renderView = () => {
    switch (view) {
      case 'schedule':
        return <BarberSchedule onManageSchedule={() => setView('manage')} />;
      case 'manage':
        return <ManageSchedule onBack={() => setView('schedule')} />;
      case 'profile':
        return <MyProfile onBack={() => setView('schedule')} />;
      default:
        return <BarberSchedule onManageSchedule={() => setView('manage')} />;
    }
  };

  // Retorna o código JSX (a interface) que o componente irá renderizar.
  return (
    // Cria um 'div' principal que serve como contêiner para todo o app.
    // As classes do Tailwind definem altura mínima da tela (min-h-screen) e um fundo escuro (bg-gray-950).
    <div className="min-h-screen bg-gray-950">

      {/* Renderização da view atual */}
      {renderView()}

      {/* Barra de navegação inferior do barbeiro */}
      <BarberBottomNav activeView={view} onNavigate={setView} />

      {/* Renderiza o componente 'AIFloatingButton'. */}
      {/* Ele está fora da condicional, então aparece nas duas telas ('schedule' e 'manage'). */}
      <AIFloatingButton />
    </div>
  );
};