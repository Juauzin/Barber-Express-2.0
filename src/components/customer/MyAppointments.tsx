import React from 'react';
import { useApp } from '../../context/AppContext';
import { Calendar, Clock, User, ChevronLeft } from 'lucide-react';

interface MyAppointmentsProps {
  onBack: () => void;
}

export const MyAppointments: React.FC<MyAppointmentsProps> = ({ onBack }) => {
  const { currentUser, appointments, barbers, services } = useApp();

  const userAppointments = appointments.filter(app => app.customerId === currentUser?.id);

  const groupedByMonth = userAppointments.reduce((acc, appointment) => {
    const date = new Date(appointment.date);
    const monthYear = date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

    if (!acc[monthYear]) {
      acc[monthYear] = [];
    }
    acc[monthYear].push(appointment);
    return acc;
  }, {} as Record<string, typeof userAppointments>);

  Object.keys(groupedByMonth).forEach(key => {
    groupedByMonth[key].sort((a, b) => {
      const dateA = new Date(a.date + ' ' + a.time);
      const dateB = new Date(b.date + ' ' + b.time);
      return dateB.getTime() - dateA.getTime();
    });
  });

  const getBarberName = (barberId: number) => {
    return barbers.find(b => b.id === barberId)?.name || 'Unknown';
  };

  const getServiceName = (serviceId: number) => {
    return services.find(s => s.id === serviceId)?.name || 'Unknown';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', weekday: 'short' });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Scheduled':
        return 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30';
      case 'Completed':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Canceled':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 pb-24">
      <div className="bg-gray-900 p-4 flex items-center gap-4 border-b border-gray-800">
        <button onClick={onBack} className="text-gray-400 hover:text-white">
          <ChevronLeft size={24} />
        </button>
  <h1 className="text-xl font-bold text-white">Meus Agendamentos</h1>
      </div>

      <div className="p-6">
        {userAppointments.length === 0 ? (
          <div className="text-center py-12">
            <Calendar className="text-gray-600 mx-auto mb-4" size={64} />
            <h2 className="text-xl font-semibold text-white mb-2">Ainda sem Agendamentos</h2>
            <p className="text-gray-400">Agende seu primeiro horário para começar!</p>
          </div>
        ) : (
      <div className="space-y-6">
            {Object.entries(groupedByMonth).map(([month, monthAppointments]) => (
              <div key={month}>
                <h2 className="text-lg font-semibold text-white mb-3 sticky top-0 bg-gray-950 py-2">
                  {month}
                </h2>
                <div className="space-y-3">
                  {monthAppointments.map((appointment) => (
                    <div
                      key={appointment.id}
                      className="bg-gray-900 rounded-2xl p-5 border border-gray-800"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-3">
                          <div className="bg-cyan-500/20 rounded-full p-2">
                            <Calendar className="text-cyan-400" size={20} />
                          </div>
                          <div>
                            <p className="text-white font-semibold">{formatDate(appointment.date)}</p>
                            <p className="text-gray-400 text-sm">{appointment.time}</p>
                          </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(appointment.status)}`}>
                          {appointment.status}
                        </span>
                      </div>

                            <div className="space-y-2 pl-11">
                        <div className="flex items-center gap-2 text-sm">
                          <User className="text-gray-500" size={16} />
                          <span className="text-gray-300">Barbeiro:</span>
                          <span className="text-white font-medium">{getBarberName(appointment.barberId)}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="text-gray-500" size={16} />
                          <span className="text-gray-300">Serviço:</span>
                          <span className="text-white font-medium">{getServiceName(appointment.serviceId)}</span>
                        </div>
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
