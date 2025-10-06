import React from 'react';
import { Home, Calendar, Plus, Heart, User } from 'lucide-react';

interface BottomNavProps {
  activeView: string;
  onNavigate: (view: string) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeView, onNavigate }) => {
  const navItems = [
    { id: 'home', icon: Home, label: 'Início' },
    { id: 'appointments', icon: Calendar, label: 'Agendamentos' },
    { id: 'schedule-barber', icon: Plus, label: 'Agendar', special: true },
    { id: 'favorites', icon: Heart, label: 'Favoritos' },
    { id: 'profile', icon: User, label: 'Perfil' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 px-4 py-3 z-40">
      <div className="flex justify-around items-center max-w-lg mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;

          if (item.special) {
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className="bg-cyan-500 hover:bg-cyan-600 text-white p-4 rounded-full -mt-8 shadow-lg transition-all duration-200 hover:scale-105"
              >
                <Icon size={24} />
              </button>
            );
          }

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
