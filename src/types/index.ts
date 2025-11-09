// Define os tipos de usuário possíveis dentro da aplicação.
export type UserType = 'customer' | 'barber';

// Representa um usuário autenticável (cliente ou barbeiro).
// Campos opcionais: phone e photoUrl para enriquecer perfil.
export interface User {
  id: number; // identificador único
  name: string; // nome completo
  email: string; // e-mail usado para login
  password: string; // senha simples (apenas em memória neste protótipo)
  type: UserType; // tipo do usuário ('customer' ou 'barber')
  phone?: string; // telefone opcional (clientes)
  photoUrl?: string; // avatar/foto de perfil
}

// Informações públicas de um barbeiro visíveis ao cliente.
export interface Barber {
  id: number; // id do barbeiro (corresponde a User.id)
  name: string; // nome exibido
  photoUrl: string; // imagem de perfil
  rating: number; // média de avaliações (0-5)
}

// Serviço oferecido na barbearia.
export interface Service {
  id: number; // id único do serviço
  name: string; // nome (ex.: Corte, Barba, Combo)
  price: number; // preço em moeda
  durationMinutes: number; // duração estimada para cálculo de agenda
}

// Conjunto de horários disponíveis em um dia para um barbeiro.
export interface AvailableSlot {
  barberId: number; // referência ao barbeiro
  date: string; // data ISO (YYYY-MM-DD)
  hours: string[]; // lista de horários (HH:MM) disponíveis para agendamento
}

// Estado de um agendamento ao longo do ciclo de vida.
export type AppointmentStatus = 'Scheduled' | 'Completed' | 'Canceled';

// Agendamento individual de um serviço para um cliente com um barbeiro.
export interface Appointment {
  id: number; // identificador único do agendamento
  customerId: number; // referência ao cliente (User.id)
  barberId: number; // referência ao barbeiro (User.id)
  serviceId: number; // serviço selecionado
  date: string; // data do serviço (YYYY-MM-DD)
  time: string; // horário do serviço (HH:MM)
  status: AppointmentStatus; // estado atual
}
