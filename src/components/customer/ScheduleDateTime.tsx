import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { Service } from '../../types';

interface ScheduleDateTimeProps {
  barberId: number;
  onNext: (date: string, time: string, selectedServices: Service[]) => void;
  onBack: () => void;
}

export const ScheduleDateTime: React.FC<ScheduleDateTimeProps> = ({ barberId, onNext, onBack }) => {
  const { availableSlots, services, barbers, appointments } = useApp();
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [selectedServices, setSelectedServices] = useState<number[]>([]);

  const barber = barbers.find(b => b.id === barberId);
  const barberSlots = availableSlots.filter(slot => slot.barberId === barberId);

  const dates = Array.from(new Set(barberSlots.map(slot => slot.date))).sort();

  const getAvailableHours = (date: string) => {
    const slot = barberSlots.find(s => s.date === date);
    if (!slot) return [];

    const bookedTimes = appointments
      .filter(app => app.barberId === barberId && app.date === date && app.status === 'Scheduled')
      .map(app => app.time);

    return slot.hours.filter(hour => !bookedTimes.includes(hour));
  };

  const availableHours = selectedDate ? getAvailableHours(selectedDate) : [];

  const toggleService = (serviceId: number) => {
    setSelectedServices(prev =>
      prev.includes(serviceId)
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const selectedServiceObjects = services.filter(s => selectedServices.includes(s.id));
  const totalPrice = selectedServiceObjects.reduce((sum, s) => sum + s.price, 0);

  const handleContinue = () => {
    if (selectedDate && selectedTime && selectedServices.length > 0) {
      onNext(selectedDate, selectedTime, selectedServiceObjects);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', weekday: 'short' });
  };

  const canContinue = selectedDate && selectedTime && selectedServices.length > 0;

  return (
    <div className="min-h-screen bg-gray-950 pb-24">
      <div className="bg-gray-900 p-4 flex items-center gap-4 border-b border-gray-800">
        <button onClick={onBack} className="text-gray-400 hover:text-white">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-xl font-bold text-white">Schedule Your Cut</h1>
      </div>

      <div className="p-6 space-y-6">
        <div className="bg-gray-900 rounded-2xl p-5 border border-gray-800">
          <div className="flex items-center gap-3 mb-1">
            <img src={barber?.photoUrl} alt={barber?.name} className="w-12 h-12 rounded-full object-cover" />
            <div>
              <h3 className="text-white font-semibold">{barber?.name}</h3>
              <p className="text-gray-400 text-sm">Your selected barber</p>
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-3">
            <Calendar className="text-cyan-400" size={20} />
            <h2 className="text-white font-semibold">Select Date</h2>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {dates.map((date) => (
              <button
                key={date}
                onClick={() => {
                  setSelectedDate(date);
                  setSelectedTime('');
                }}
                className={`p-3 rounded-xl border-2 transition-all duration-200 ${
                  selectedDate === date
                    ? 'border-cyan-500 bg-cyan-500/10'
                    : 'border-gray-800 bg-gray-900 hover:border-gray-700'
                }`}
              >
                <div className="text-center">
                  <p className="text-white font-semibold text-sm">{formatDate(date)}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {selectedDate && (
          <div>
            <h2 className="text-white font-semibold mb-3">Select Time</h2>
            <div className="grid grid-cols-4 gap-2">
              {availableHours.map((hour) => (
                <button
                  key={hour}
                  onClick={() => setSelectedTime(hour)}
                  className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                    selectedTime === hour
                      ? 'border-cyan-500 bg-cyan-500/10 text-cyan-400'
                      : 'border-gray-800 bg-gray-900 text-gray-300 hover:border-gray-700'
                  }`}
                >
                  <p className="text-sm font-medium">{hour}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        <div>
          <h2 className="text-white font-semibold mb-3">Select Services</h2>
          <div className="space-y-3">
            {services.map((service) => (
              <button
                key={service.id}
                onClick={() => toggleService(service.id)}
                className={`w-full bg-gray-900 rounded-xl p-4 border-2 transition-all duration-200 ${
                  selectedServices.includes(service.id)
                    ? 'border-cyan-500 bg-cyan-500/10'
                    : 'border-gray-800 hover:border-gray-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="text-left">
                    <h3 className="text-white font-medium mb-1">{service.name}</h3>
                    <p className="text-gray-400 text-sm">{service.durationMinutes} minutes</p>
                  </div>
                  <div className="text-right">
                    <p className="text-cyan-400 font-bold">${service.price.toFixed(2)}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {selectedServices.length > 0 && (
          <div className="bg-gradient-to-r from-cyan-900/30 to-cyan-800/20 rounded-xl p-4 border border-cyan-700/30">
            <div className="flex justify-between items-center">
              <span className="text-white font-semibold">Total Price:</span>
              <span className="text-cyan-400 font-bold text-xl">${totalPrice.toFixed(2)}</span>
            </div>
          </div>
        )}

        <button
          onClick={handleContinue}
          disabled={!canContinue}
          className={`w-full py-4 rounded-xl font-semibold transition-all duration-200 ${
            canContinue
              ? 'bg-cyan-500 hover:bg-cyan-600 text-white'
              : 'bg-gray-800 text-gray-500 cursor-not-allowed'
          }`}
        >
          Continue to Summary
        </button>
      </div>
    </div>
  );
};
