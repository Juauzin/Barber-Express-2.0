// Importa React para criar componentes funcionais
import React from 'react';
// Importa contexto global da aplicação (usuário, logout)
import { useApp } from '../../context/AppContext';
// Importa ícones para exibição visual
import { ChevronLeft, ChevronRight, User, Mail, Lock, Bell, LogOut } from 'lucide-react';

/**
 * Tela de Perfil do Cliente
 * Exibe dados pessoais, foto, e opções futuras de edição/configuração.
 * Permite logout e navegação de volta.
 */

// Propriedades esperadas pelo componente: função para voltar
interface MyProfileProps {
  onBack: () => void; // callback para voltar
}

export const MyProfile: React.FC<MyProfileProps> = ({ onBack }) => {
  // Extrai dados do contexto global
  const { currentUser, logout } = useApp();

  // Lista de itens do menu de perfil (edição, senha, notificações)
  const menuItems = [
    { icon: User, label: 'Editar Perfil', action: () => alert('Recurso de editar perfil em breve!') },
    { icon: Lock, label: 'Alterar Senha', action: () => alert('Recurso de alterar senha em breve!') },
    { icon: Bell, label: 'Notificações', action: () => alert('Recurso de notificações em breve!') },
  ];

  // Renderização do componente
  return (
    <div className="min-h-screen bg-gray-950 pb-24"> {/* Altura mínima e padding inferior */}
      {/* Barra superior com botão de voltar e título */}
      <div className="bg-gray-900 p-4 flex items-center gap-4 border-b border-gray-800">
        <button onClick={onBack} className="text-gray-400 hover:text-white"> {/* Botão de voltar */}
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-xl font-bold text-white">Meu Perfil</h1>
      </div>

      {/* Bloco de dados pessoais do usuário */}
      <div className="p-6 space-y-6">
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 border border-gray-800">
          <div className="flex items-center gap-4">
            <img
              src={currentUser?.photoUrl || 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200'} // Foto do usuário
              alt={currentUser?.name}
              className="w-20 h-20 rounded-full object-cover border-4 border-cyan-500"
            />
            <div className="flex-1">
              <h2 className="text-xl font-bold text-white mb-1">{currentUser?.name}</h2>
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <Mail size={16} /> {/* Ícone de email */}
                <span>{currentUser?.email}</span>
              </div>
              {currentUser?.phone && (
                <p className="text-gray-400 text-sm mt-1">{currentUser.phone}</p>
              )}
            </div>
          </div>
        </div>

        {/* Bloco de opções do menu de perfil */}
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
