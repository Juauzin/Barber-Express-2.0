import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, Barber, Service, AvailableSlot, Appointment } from '../types';

/**
 * Contexto global da aplicação (AppContext)
 * Centraliza dados em memória e ações para autenticação e agendamentos.
 * Este protótipo não possui backend: os dados são mantidos no estado do React.
 */

// Contrato do contexto: dados expostos e operações suportadas
interface AppContextType {
  currentUser: User | null;
  users: User[];
  barbers: Barber[];
  services: Service[];
  availableSlots: AvailableSlot[];
  appointments: Appointment[];
  login: (email: string, password: string) => User | null;
  logout: () => void;
  signUp: (name: string, email: string, phone: string, password: string) => User | null;
  addAppointment: (appointment: Omit<Appointment, 'id'>) => void;
  updateAvailableSlots: (barberId: number, date: string, hours: string[]) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Dados iniciais (mock) para demonstração
const initialUsers: User[] = [
  { id: 1, name: 'João Nogueira', email: 'joao@gmail.com', password: '123', type: 'customer', phone: '(11) 98765-4321', photoUrl: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200' },
  { id: 2, name: 'Jardel', email: 'jardel@barber.com', password: '123', type: 'barber', photoUrl: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=200' },
  { id: 3, name: 'Caio', email: 'caio@barber.com', password: '123', type: 'barber', photoUrl: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200' },
  { id: 3, name: 'João Roberto', email: 'marccopollo16@gmail.com', password: '123', type: 'barber', photoUrl: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200' },
];

const initialBarbers: Barber[] = [
  { id: 2, name: 'Jardel', photoUrl: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=200', rating: 5.0 },
  { id: 3, name: 'Caio', photoUrl: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200', rating: 4.8 },
];

const initialServices: Service[] = [
  { id: 201, name: 'Clipper and Scissors Cut', price: 40.00, durationMinutes: 35 },
  { id: 202, name: 'Scissors Cut', price: 45.00, durationMinutes: 40 },
  { id: 203, name: 'Beard Trim', price: 25.00, durationMinutes: 20 },
  { id: 204, name: 'Hair and Beard Combo', price: 60.00, durationMinutes: 50 },
];

// Horários disponíveis por barbeiro e data (mock)
const initialAvailableSlots: AvailableSlot[] = [
  { barberId: 2, date: '2025-05-24', hours: ['08:00', '09:00', '10:00', '11:00', '14:00', '15:00', '16:00'] },
  { barberId: 2, date: '2025-05-25', hours: ['08:00', '09:00', '10:00', '11:00', '14:00', '15:00'] },
  { barberId: 3, date: '2025-05-24', hours: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'] },
  { barberId: 3, date: '2025-05-25', hours: ['08:00', '09:00', '10:00', '14:00', '15:00', '16:00'] },
];

// Agendamentos de exemplo para popular telas
const initialAppointments: Appointment[] = [
  { id: 301, customerId: 1, barberId: 2, serviceId: 201, date: '2025-05-24', time: '10:00', status: 'Scheduled' },
  { id: 302, customerId: 1, barberId: 3, serviceId: 203, date: '2025-04-15', time: '14:00', status: 'Completed' },
];

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Estados globais (em memória) que representam o "banco de dados" do app
  const [currentUser, setCurrentUser] = useState<User | null>(null); // usuário atualmente logado
  const [users, setUsers] = useState<User[]>(initialUsers); // todos os usuários (clientes e barbeiros)
  const [barbers] = useState<Barber[]>(initialBarbers); // catálogo de barbeiros
  const [services] = useState<Service[]>(initialServices); // serviços oferecidos
  const [availableSlots, setAvailableSlots] = useState<AvailableSlot[]>(initialAvailableSlots); // disponibilidade
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments); // agendamentos

  // Autentica um usuário por e-mail/senha e armazena em currentUser
  const login = (email: string, password: string): User | null => {
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      setCurrentUser(user);
      return user;
    }
    return null;
  };

  // Finaliza a sessão, limpando o usuário atual
  const logout = () => {
    setCurrentUser(null);
  };

  // Cadastra um novo cliente (se e-mail ainda não existir) e faz login automático
  const signUp = (name: string, email: string, phone: string, password: string): User | null => {
    if (users.find(u => u.email === email)) {
      return null; // e-mail já cadastrado
    }
    const newUser: User = {
      id: Math.max(...users.map(u => u.id)) + 1,
      name,
      email,
      phone,
      password,
      type: 'customer',
      photoUrl: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200',
    };
    setUsers([...users, newUser]);
    setCurrentUser(newUser);
    return newUser;
  };

  // Cria um novo agendamento atribuindo um id incremental
  const addAppointment = (appointment: Omit<Appointment, 'id'>) => {
    const newAppointment: Appointment = {
      ...appointment,
      id: appointments.length > 0 ? Math.max(...appointments.map(a => a.id)) + 1 : 1,
    };
    setAppointments([...appointments, newAppointment]);
  };

  // Atualiza os horários disponíveis de um barbeiro em uma data específica.
  // Se já existe registro para a data, substitui; senão, cria um novo.
  const updateAvailableSlots = (barberId: number, date: string, hours: string[]) => {
    const existingIndex = availableSlots.findIndex(
      slot => slot.barberId === barberId && slot.date === date
    );

    if (existingIndex >= 0) {
      const updated = [...availableSlots];
      updated[existingIndex] = { barberId, date, hours };
      setAvailableSlots(updated);
    } else {
      setAvailableSlots([...availableSlots, { barberId, date, hours }]);
    }
  };

  // Expondo os valores e ações do contexto para os componentes filhos
  return (
    <AppContext.Provider
      value={{
        currentUser,
        users,
        barbers,
        services,
        availableSlots,
        appointments,
        login,
        logout,
        signUp,
        addAppointment,
        updateAvailableSlots,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Hook auxiliar para consumir o AppContext com validação em tempo de execução
export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
