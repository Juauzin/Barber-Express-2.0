import React from 'react';
import { Calendar, Wrench, User } from 'lucide-react';

interface BarberBottomNavProps {
  activeView: 'schedule' | 'manage' | 'profile';
  onNavigate: (view: 'schedule' | 'manage' | 'profile') => void;
}

/**
 * Barra de navegação inferior para o app do barbeiro
 * Permite alternar entre: Agenda, Gerenciar Agenda e Perfil
 */
export const BarberBottomNav: React.FC<BarberBottomNavProps> = ({ activeView, onNavigate }) => {
  // Tipagem mais ampla para acomodar os ícones do lucide-react
  const navItems: Array<{ id: BarberBottomNavProps['activeView']; label: string; icon: any }> = [
    { id: 'schedule', label: 'Agenda', icon: Calendar },
    { id: 'manage', label: 'Gerenciar', icon: Wrench },
    { id: 'profile', label: 'Perfil', icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 px-4 py-3 z-40">
      <div className="flex justify-around items-center max-w-lg mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center gap-1 transition-colors duration-200 ${
                isActive ? 'text-cyan-400' : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              <Icon size={22} />
              <span className="text-xs">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
