import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CustomerHome } from './customer/CustomerHome';
import { BottomNav } from './customer/BottomNav';
import { ScheduleBarber } from './customer/ScheduleBarber';
import { ScheduleDateTime } from './customer/ScheduleDateTime';
import { ScheduleSummary } from './customer/ScheduleSummary';
import { ScheduleSuccess } from './customer/ScheduleSuccess';
import { MyAppointments } from './customer/MyAppointments';
import { MyProfile } from './customer/MyProfile';
import { Favorites } from './customer/Favorites';
import { AIFloatingButton } from './AIFloatingButton';
import { Service } from '../types';

export const CustomerApp: React.FC = () => {
  const { addAppointment, currentUser } = useApp();
  const [view, setView] = useState('home');
  const [scheduleState, setScheduleState] = useState({
    barberId: 0,
    date: '',
    time: '',
    selectedServices: [] as Service[],
  });

  const handleScheduleBarberNext = (barberId: number) => {
    setScheduleState({ ...scheduleState, barberId });
    setView('schedule-datetime');
  };

  const handleScheduleDateTimeNext = (date: string, time: string, selectedServices: Service[]) => {
    setScheduleState({ ...scheduleState, date, time, selectedServices });
    setView('schedule-summary');
  };

  const handleConfirmAppointment = () => {
    if (currentUser) {
      scheduleState.selectedServices.forEach((service) => {
        addAppointment({
          customerId: currentUser.id,
          barberId: scheduleState.barberId,
          serviceId: service.id,
          date: scheduleState.date,
          time: scheduleState.time,
          status: 'Scheduled',
        });
      });
      setView('schedule-success');
    }
  };

  const renderView = () => {
    switch (view) {
      case 'home':
        return <CustomerHome onNavigate={setView} />;
      case 'appointments':
        return <MyAppointments onBack={() => setView('home')} />;
      case 'favorites':
        return <Favorites onBack={() => setView('home')} />;
      case 'profile':
        return <MyProfile onBack={() => setView('home')} />;
      case 'schedule-barber':
        return (
          <ScheduleBarber
            onNext={handleScheduleBarberNext}
            onBack={() => setView('home')}
          />
        );
      case 'schedule-datetime':
        return (
          <ScheduleDateTime
            barberId={scheduleState.barberId}
            onNext={handleScheduleDateTimeNext}
            onBack={() => setView('schedule-barber')}
          />
        );
      case 'schedule-summary':
        return (
          <ScheduleSummary
            barberId={scheduleState.barberId}
            date={scheduleState.date}
            time={scheduleState.time}
            selectedServices={scheduleState.selectedServices}
            onConfirm={handleConfirmAppointment}
            onBack={() => setView('schedule-datetime')}
          />
        );
      case 'schedule-success':
        return (
          <ScheduleSuccess
            onViewAppointments={() => setView('appointments')}
            onGoHome={() => setView('home')}
          />
        );
      default:
        return <CustomerHome onNavigate={setView} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-950">
      {renderView()}
      {!view.includes('schedule-success') && <BottomNav activeView={view} onNavigate={setView} />}
      <AIFloatingButton />
    </div>
  );
};
