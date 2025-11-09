import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Login } from './components/auth/Login';
import { SignUp } from './components/auth/SignUp';
import { CustomerApp } from './components/CustomerApp';
import { BarberApp } from './components/BarberApp';

/**
 * AppContent
 * Decide o que renderizar com base no estado de autenticação atual.
 * - Sem usuário: Login/SignUp
 * - Com usuário: CustomerApp (cliente) ou BarberApp (barbeiro)
 */
const AppContent: React.FC = () => {
  const { currentUser } = useApp();
  const [authView, setAuthView] = useState<'login' | 'signup'>('login');

  // Caso ainda não exista usuário autenticado:
  // - Utiliza um operador ternário para alternar entre a tela de Login e a de Cadastro.
  // - A mudança ocorre quando os botões internos chamam setAuthView('signup' | 'login').
  if (!currentUser) {
    return authView === 'login'
      ? (
          <Login onSwitchToSignUp={() => setAuthView('signup')} />
        )
      : (
          <SignUp onSwitchToLogin={() => setAuthView('login')} />
        );
  }

  // Usuário autenticado: direciona para a aplicação conforme o tipo (customer ou barber)
  return currentUser.type === 'customer' ? <CustomerApp /> : <BarberApp />;
};

/**
 * Componente raiz: envolve a aplicação com o AppProvider,
 * que expõe o estado global (usuários, agendamentos, etc.).
 */
function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
