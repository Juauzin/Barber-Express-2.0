import React from 'react';
import { useApp } from '../../context/AppContext';
import { Clock, Calendar, Tag } from 'lucide-react';

interface CustomerHomeProps {
  onNavigate: (view: string) => void;
}

export const CustomerHome: React.FC<CustomerHomeProps> = ({ onNavigate }) => {
  const { currentUser, appointments, barbers, services } = useApp();

  const userAppointments = appointments.filter(
    app => app.customerId === currentUser?.id && app.status === 'Scheduled'
  );

  const nextAppointment = userAppointments
    .sort((a, b) => new Date(a.date + ' ' + a.time).getTime() - new Date(b.date + ' ' + b.time).getTime())[0];

  const getBarberName = (barberId: number) => {
    return barbers.find(b => b.id === barberId)?.name || 'Unknown';
  };

  const getServiceName = (serviceId: number) => {
    return services.find(s => s.id === serviceId)?.name || 'Unknown';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="pb-24">
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-b-3xl p-6 mb-6">
        <h1 className="text-2xl font-bold text-white mb-1">
          Hello, {currentUser?.name?.split(' ')[0]}
        </h1>
        <p className="text-gray-400">Ready for your next cut?</p>
      </div>

      <div className="px-4 space-y-4">
        <div className="bg-gray-900 rounded-2xl p-5 border border-gray-800">
          <div className="flex items-center gap-3 mb-3">
            <Clock className="text-cyan-400" size={24} />
            <h2 className="text-white font-semibold text-lg">Business Hours</h2>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-gray-300">
              <span>Monday - Friday</span>
              <span className="font-medium text-white">8:00 AM - 8:00 PM</span>
            </div>
            <div className="flex justify-between text-gray-300">
              <span>Saturday</span>
              <span className="font-medium text-white">9:00 AM - 6:00 PM</span>
            </div>
            <div className="flex justify-between text-gray-300">
              <span>Sunday</span>
              <span className="font-medium text-red-400">Closed</span>
            </div>
          </div>
        </div>

        {nextAppointment && (
          <div className="bg-gradient-to-br from-cyan-900/30 to-cyan-800/20 rounded-2xl p-5 border border-cyan-700/30">
            <div className="flex items-center gap-3 mb-4">
              <Calendar className="text-cyan-400" size={24} />
              <h2 className="text-white font-semibold text-lg">Your Next Appointment</h2>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Barber</span>
                <span className="text-white font-medium">{getBarberName(nextAppointment.barberId)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Service</span>
                <span className="text-white font-medium">{getServiceName(nextAppointment.serviceId)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Date</span>
                <span className="text-cyan-400 font-medium">{formatDate(nextAppointment.date)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Time</span>
                <span className="text-cyan-400 font-medium">{nextAppointment.time}</span>
              </div>
            </div>
          </div>
        )}

        <div className="bg-gray-900 rounded-2xl p-5 border border-gray-800">
          <div className="flex items-center gap-3 mb-4">
            <Tag className="text-cyan-400" size={24} />
            <h2 className="text-white font-semibold text-lg">Special Offers</h2>
          </div>
          <div className="space-y-3">
            <div className="bg-gradient-to-r from-cyan-500/10 to-transparent p-4 rounded-xl border border-cyan-500/20">
              <h3 className="text-white font-semibold mb-1">Hair & Beard Combo</h3>
              <p className="text-gray-400 text-sm mb-2">Save $5 when you book both services together</p>
              <p className="text-cyan-400 font-bold text-lg">$60.00</p>
            </div>
            <div className="bg-gradient-to-r from-green-500/10 to-transparent p-4 rounded-xl border border-green-500/20">
              <h3 className="text-white font-semibold mb-1">First Visit Discount</h3>
              <p className="text-gray-400 text-sm mb-2">New customers get 10% off their first service</p>
              <p className="text-green-400 font-bold">Use code: FIRST10</p>
            </div>
          </div>
        </div>

        <button
          onClick={() => onNavigate('schedule-barber')}
          className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-4 rounded-xl transition-colors duration-200"
        >
          Book an Appointment
        </button>
      </div>
    </div>
  );
};
