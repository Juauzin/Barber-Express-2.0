export type UserType = 'customer' | 'barber';

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  type: UserType;
  phone?: string;
  photoUrl?: string;
}

export interface Barber {
  id: number;
  name: string;
  photoUrl: string;
  rating: number;
}

export interface Service {
  id: number;
  name: string;
  price: number;
  durationMinutes: number;
}

export interface AvailableSlot {
  barberId: number;
  date: string;
  hours: string[];
}

export type AppointmentStatus = 'Scheduled' | 'Completed' | 'Canceled';

export interface Appointment {
  id: number;
  customerId: number;
  barberId: number;
  serviceId: number;
  date: string;
  time: string;
  status: AppointmentStatus;
}
