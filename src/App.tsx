import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Login } from './components/auth/Login';
import { SignUp } from './components/auth/SignUp';
import { CustomerApp } from './components/CustomerApp';
import { BarberApp } from './components/BarberApp';

const AppContent: React.FC = () => {
  const { currentUser } = useApp();
  const [authView, setAuthView] = useState<'login' | 'signup'>('login');

  if (!currentUser) {
    return authView === 'login' ? (
      <Login onSwitchToSignUp={() => setAuthView('signup')} />
    ) : (
      <SignUp onSwitchToLogin={() => setAuthView('login')} />
    );
  }

  return currentUser.type === 'customer' ? <CustomerApp /> : <BarberApp />;
};

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
