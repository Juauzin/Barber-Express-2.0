import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Mail, Lock, User, Phone, Check, X } from 'lucide-react';

/**
 * Tela de Cadastro (SignUp)
 * Permite criar uma nova conta de cliente, validando senha e dados básicos.
 * Exibe requisitos de senha e feedback de erro.
 */

interface SignUpProps {
  onSwitchToLogin: () => void;
}

export const SignUp: React.FC<SignUpProps> = ({ onSwitchToLogin }) => {
  const { signUp } = useApp(); // função de cadastro do contexto
  const [name, setName] = useState(''); // nome completo do usuário
  const [email, setEmail] = useState(''); // e-mail do usuário
  const [phone, setPhone] = useState(''); // telefone do usuário
  const [password, setPassword] = useState(''); // senha digitada
  const [confirmPassword, setConfirmPassword] = useState(''); // confirmação da senha
  const [error, setError] = useState(''); // mensagem de erro exibida

  // Requisitos de senha para validação visual
  const passwordRequirements = {
    minLength: password.length >= 8,
    hasLetter: /[a-zA-Z]/.test(password),
    hasNumber: /\d/.test(password),
    hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };

  // Senha válida apenas se todos os requisitos forem atendidos
  const isPasswordValid = Object.values(passwordRequirements).every(Boolean);

  // Handler do submit: valida senha, confirma senha e tenta cadastro.
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!isPasswordValid) {
      setError('A senha não atende aos requisitos');
      return;
    }

    if (password !== confirmPassword) {
      setError('As senhas não coincidem');
      return;
    }

    const user = signUp(name, email, phone, password);
    if (!user) {
      setError('Email já cadastrado');
    }
  };

  // Componente auxiliar para exibir cada requisito de senha
  const RequirementItem: React.FC<{ met: boolean; text: string }> = ({ met, text }) => (
    <div className={`flex items-center gap-2 text-sm ${met ? 'text-green-400' : 'text-gray-500'}`}>
      {met ? <Check size={16} /> : <X size={16} />}
      <span>{text}</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          {/* Título principal da tela de cadastro */}
          <h1 className="text-3xl font-bold text-white mb-2">Criar Conta</h1>
          {/* Subtexto convidando o usuário */}
          <p className="text-gray-400">Junte-se a nós hoje</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-gray-900 rounded-2xl p-8 shadow-xl">
          {error && (
            // Exibe mensagem de erro caso haja falha na validação ou cadastro
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
              {error}
            </div>
          )}

          <div className="mb-4">
            <label className="block text-gray-300 mb-2 text-sm font-medium">Nome Completo</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-gray-800 text-white rounded-lg pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="Seu nome completo"
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-300 mb-2 text-sm font-medium">E-mail</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-800 text-white rounded-lg pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="seu@email.com"
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-300 mb-2 text-sm font-medium">Telefone</label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-gray-800 text-white rounded-lg pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="(11) 98765-4321"
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-300 mb-2 text-sm font-medium">Senha</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-800 text-white rounded-lg pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="Crie uma senha"
                required
              />
            </div>
            {password && (
              <div className="mt-3 p-3 bg-gray-800 rounded-lg space-y-2">
                <RequirementItem met={passwordRequirements.minLength} text="Pelo menos 8 caracteres" />
                <RequirementItem met={passwordRequirements.hasLetter} text="Contém letras" />
                <RequirementItem met={passwordRequirements.hasNumber} text="Contém números" />
                <RequirementItem met={passwordRequirements.hasSpecial} text="Contém caractere especial" />
              </div>
            )}
          </div>

          <div className="mb-6">
            <label className="block text-gray-300 mb-2 text-sm font-medium">Confirmar Senha</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-gray-800 text-white rounded-lg pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="Confirme sua senha"
                required
              />
            </div>
          </div>

          {/* Botão principal para criar conta */}
          <button
            type="submit"
            className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-3 rounded-lg transition-colors duration-200 mb-4"
          >
            Criar Conta
          </button>

          <div className="text-center">
            {/* Botão para alternar para tela de login */}
            <button
              type="button"
              onClick={onSwitchToLogin}
              className="text-cyan-400 hover:text-cyan-300 text-sm"
            >
              Já tem uma conta? Entrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
