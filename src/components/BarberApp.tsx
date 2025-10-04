import React, { useState } from 'react';
import { BarberSchedule } from './barber/BarberSchedule';
import { ManageSchedule } from './barber/ManageSchedule';
import { AIFloatingButton } from './AIFloatingButton';

export const BarberApp: React.FC = () => {
  const [view, setView] = useState<'schedule' | 'manage'>('schedule');

  return (
    <div className="min-h-screen bg-gray-950">
      {view === 'schedule' ? (
        <BarberSchedule onManageSchedule={() => setView('manage')} />
      ) : (
        <ManageSchedule onBack={() => setView('schedule')} />
      )}
      <AIFloatingButton />
    </div>
  );
};
