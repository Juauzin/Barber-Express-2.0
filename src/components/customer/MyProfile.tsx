import React from 'react';
import { useApp } from '../../context/AppContext';
import { ChevronLeft, ChevronRight, User, Mail, Lock, Bell, LogOut } from 'lucide-react';

/**
 * Tela de Perfil do Cliente
 * Exibe dados pessoais, foto, e opções futuras de edição/configuração.
 * Permite logout e navegação de volta.
 */

interface MyProfileProps {
  onBack: () => void;
}

export const MyProfile: React.FC<MyProfileProps> = ({ onBack }) => {
  const { currentUser, logout } = useApp();

  const menuItems = [
    { icon: User, label: 'Editar Perfil', action: () => alert('Recurso de editar perfil em breve!') },
    { icon: Lock, label: 'Alterar Senha', action: () => alert('Recurso de alterar senha em breve!') },
    { icon: Bell, label: 'Notificações', action: () => alert('Recurso de notificações em breve!') },
  ];

  return (
    <div className="min-h-screen bg-gray-950 pb-24">
      <div className="bg-gray-900 p-4 flex items-center gap-4 border-b border-gray-800">
        <button onClick={onBack} className="text-gray-400 hover:text-white">
          <ChevronLeft size={24} />
        </button>
  <h1 className="text-xl font-bold text-white">Meu Perfil</h1>
      </div>

      <div className="p-6 space-y-6">
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 border border-gray-800">
          <div className="flex items-center gap-4">
            <img
              src={currentUser?.photoUrl || 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200'}
              alt={currentUser?.name}
              className="w-20 h-20 rounded-full object-cover border-4 border-cyan-500"
            />
            <div className="flex-1">
              <h2 className="text-xl font-bold text-white mb-1">{currentUser?.name}</h2>
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <Mail size={16} />
                <span>{currentUser?.email}</span>
              </div>
              {currentUser?.phone && (
                <p className="text-gray-400 text-sm mt-1">{currentUser.phone}</p>
              )}
            </div>
          </div>
        </div>

        <div className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <button
                key={index}
                onClick={item.action}
                className={`w-full flex items-center justify-between p-4 hover:bg-gray-800 transition-colors duration-200 ${
                  index !== menuItems.length - 1 ? 'border-b border-gray-800' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="bg-gray-800 rounded-lg p-2">
                    <Icon className="text-cyan-400" size={20} />
                  </div>
                  <span className="text-white font-medium">{item.label}</span>
                </div>
                <ChevronRight className="text-gray-500" size={20} />
              </button>
            );
          })}
        </div>

        <button
          onClick={logout}
          className="w-full bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 font-semibold py-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
        >
          <LogOut size={20} />
          <span>Sair</span>
        </button>

        <div className="text-center pt-4">
          <p className="text-gray-500 text-sm">Version 1.0.0</p>
        </div>
      </div>
    </div>
  );
};
