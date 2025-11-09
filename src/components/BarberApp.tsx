// Importa as bibliotecas principais do React, incluindo o hook 'useState'.
import React, { useState } from 'react';

// Importa o componente de agendamento da barbearia.
import { BarberSchedule } from './barber/BarberSchedule';

// Importa o componente de gerenciamento da agenda.
import { ManageSchedule } from './barber/ManageSchedule';

// Importa o componente do botão flutuante de IA.
import { AIFloatingButton } from './AIFloatingButton';

// Exporta e define o componente principal 'BarberApp' como um Componente Funcional (FC).
export const BarberApp: React.FC = () => {
  // Cria uma variável de estado chamada 'view' e uma função 'setView' para atualizá-la.
  // O valor inicial de 'view' é 'schedule'.
  const [view, setView] = useState<'schedule' | 'manage'>('schedule');

  // Retorna o código JSX (a interface) que o componente irá renderizar.
  return (
    // Cria um 'div' principal que serve como contêiner para todo o app.
    // As classes do Tailwind definem altura mínima da tela (min-h-screen) e um fundo escuro (bg-gray-950).
    <div className="min-h-screen bg-gray-950">

      {/* Inicia uma renderização condicional (operador ternário). */}
      {view === 'schedule' ? (
        // SE(IF) o estado 'view' for 'schedule', renderiza o componente 'BarberSchedule'.
        // Passa uma prop 'onManageSchedule' que, quando chamada, muda o estado para 'manage'.
        <BarberSchedule onManageSchedule={() => setView('manage')} />
      ) : (
        // SENÃO(ELSE), renderiza o componente 'ManageSchedule'.
        // Passa uma prop 'onBack' que, quando chamada, muda o estado de volta para 'schedule'.
        <ManageSchedule onBack={() => setView('schedule')} />
      )}
      {/* Fim da renderização condicional. */}

      {/* Renderiza o componente 'AIFloatingButton'. */}
      {/* Ele está fora da condicional, então aparece nas duas telas ('schedule' e 'manage'). */}
      <AIFloatingButton />
    </div>
  );
};