import React from 'react';
import { useApp } from '../../context/AppContext';
import { Calendar, Clock, User, ChevronRight } from 'lucide-react';

interface BarberScheduleProps {
  onManageSchedule: () => void;
}

export const BarberSchedule: React.FC<BarberScheduleProps> = ({ onManageSchedule }) => {
  const { currentUser, appointments, users, services } = useApp();

  const barberAppointments = appointments
    .filter(app => app.barberId === currentUser?.id && app.status === 'Scheduled')
    .sort((a, b) => {
      const dateA = new Date(a.date + ' ' + a.time);
      const dateB = new Date(b.date + ' ' + b.time);
      return dateA.getTime() - dateB.getTime();
    });

  const groupedByDate = barberAppointments.reduce((acc, appointment) => {
    const date = appointment.date;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(appointment);
    return acc;
  }, {} as Record<string, typeof barberAppointments>);

  const getCustomerName = (customerId: number) => {
    return users.find(u => u.id === customerId)?.name || 'Unknown';
  };

  const getServiceName = (serviceId: number) => {
    return services.find(s => s.id === serviceId)?.name || 'Unknown';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-950 pb-24">
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-b-3xl p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-white mb-1">My Schedule</h1>
            <p className="text-gray-400">Manage your appointments</p>
          </div>
          <button
            onClick={onManageSchedule}
            className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
          >
            <Calendar size={18} />
            <span>Manage</span>
          </button>
        </div>

        <div className="grid grid-cols-3 gap-3 mt-6">
          <div className="bg-gray-800/50 rounded-xl p-3">
            <p className="text-gray-400 text-xs mb-1">Today</p>
            <p className="text-white font-bold text-xl">
              {barberAppointments.filter(a => a.date === new Date().toISOString().split('T')[0]).length}
            </p>
          </div>
          <div className="bg-gray-800/50 rounded-xl p-3">
            <p className="text-gray-400 text-xs mb-1">This Week</p>
            <p className="text-white font-bold text-xl">{barberAppointments.length}</p>
          </div>
          <div className="bg-gray-800/50 rounded-xl p-3">
            <p className="text-gray-400 text-xs mb-1">Total</p>
            <p className="text-white font-bold text-xl">
              {appointments.filter(a => a.barberId === currentUser?.id).length}
            </p>
          </div>
        </div>
      </div>

      <div className="px-4">
        {barberAppointments.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-gray-900 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">
              <Calendar className="text-gray-600" size={48} />
            </div>
            <h2 className="text-xl font-semibold text-white mb-2">No Appointments Scheduled</h2>
            <p className="text-gray-400">Your upcoming appointments will appear here.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {Object.entries(groupedByDate).map(([date, dateAppointments]) => (
              <div key={date}>
                <h2 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                  <Calendar className="text-cyan-400" size={20} />
                  {formatDate(date)}
                </h2>
                <div className="space-y-3">
                  {dateAppointments.map((appointment) => (
                    <div
                      key={appointment.id}
                      className="bg-gray-900 rounded-2xl p-5 border border-gray-800 hover:border-cyan-500/30 transition-colors duration-200"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="bg-cyan-500/20 rounded-full p-2">
                              <Clock className="text-cyan-400" size={18} />
                            </div>
                            <span className="text-cyan-400 font-bold text-lg">{appointment.time}</span>
                          </div>

                          <div className="space-y-2 pl-11">
                            <div className="flex items-center gap-2">
                              <User className="text-gray-500" size={16} />
                              <span className="text-gray-400 text-sm">Customer:</span>
                              <span className="text-white font-medium">{getCustomerName(appointment.customerId)}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="text-gray-500" size={16} />
                              <span className="text-gray-400 text-sm">Service:</span>
                              <span className="text-white font-medium">{getServiceName(appointment.serviceId)}</span>
                            </div>
                          </div>
                        </div>

                        <ChevronRight className="text-gray-600" size={20} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
