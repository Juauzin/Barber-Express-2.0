import React from 'react';
import { ChevronLeft, Heart } from 'lucide-react';

interface FavoritesProps {
  onBack: () => void;
}

export const Favorites: React.FC<FavoritesProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-gray-950 pb-24">
      <div className="bg-gray-900 p-4 flex items-center gap-4 border-b border-gray-800">
        <button onClick={onBack} className="text-gray-400 hover:text-white">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-xl font-bold text-white">Favorites</h1>
      </div>

      <div className="p-6">
        <div className="text-center py-12">
          <div className="bg-gray-900 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">
            <Heart className="text-gray-600" size={48} />
          </div>
          <h2 className="text-xl font-semibold text-white mb-2">No Favorites Yet</h2>
          <p className="text-gray-400">
            Mark your favorite barbers and services to find them quickly!
          </p>
        </div>
      </div>
    </div>
  );
};
