
import React from 'react';
import { Dish } from '../types';

interface DishCardProps {
  dish: Dish;
  isFavorite: boolean;
  onToggleFavorite: (e: React.MouseEvent, dishId: string | number) => void;
  onSelect: (dish: Dish) => void;
}

const DishCard: React.FC<DishCardProps> = ({ dish, isFavorite, onToggleFavorite, onSelect }) => {
  const isAvailable = dish.available !== false;

  return (
    <div 
      onClick={() => isAvailable && onSelect(dish)}
      className={`bg-white dark:bg-[#1A1A1A] rounded-[24px] overflow-hidden border border-gray-100 dark:border-gray-800 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.3)] transition-all relative ${isAvailable ? 'active:scale-[0.98] tap-scale cursor-pointer group' : 'opacity-50 grayscale cursor-not-allowed'}`}
    >
      <div className="relative h-44 overflow-hidden bg-gray-100 dark:bg-gray-800">
        <img 
          src={dish.image} 
          alt={dish.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <div className={`w-4 h-4 rounded-sm border ${dish.veg ? 'border-green-600 bg-green-50 dark:border-green-500 dark:bg-green-900/20' : 'border-red-600 bg-red-50 dark:border-red-500 dark:bg-red-900/20'} flex items-center justify-center shadow-sm`}>
            <div className={`w-2 h-2 rounded-full ${dish.veg ? 'bg-green-600 dark:bg-green-500' : 'bg-red-600 dark:bg-red-500'}`}></div>
          </div>
        </div>

        {/* Favorite Heart Icon */}
        <button 
          onClick={(e) => onToggleFavorite(e, dish.id)}
          className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md transition-all tap-scale shadow-md z-10 ${isFavorite ? 'bg-rose-600 text-white' : 'bg-white/90 dark:bg-black/60 text-gray-400 dark:text-gray-500 hover:text-rose-500'}`}
        >
          <svg className="w-4.5 h-4.5" fill={isFavorite ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>

        {!isAvailable && (
          <div className="absolute inset-0 bg-black/20 dark:bg-black/40 flex items-center justify-center">
             <span className="bg-black/80 text-white text-[10px] font-black uppercase tracking-[0.2em] px-4 py-2 rounded-full backdrop-blur-md">Sold Out</span>
          </div>
        )}
        {isAvailable && dish.rating && (
          <div className="absolute bottom-3 left-3 bg-white/90 dark:bg-black/60 backdrop-blur-md px-2 py-1 rounded-full flex items-center gap-1 shadow-sm">
            <span className="text-yellow-500 text-[10px]">★</span>
            <span className="text-[10px] font-black text-gray-800 dark:text-gray-200">{dish.rating}</span>
          </div>
        )}
      </div>

      <div className="p-4 sm:p-5">
        <div className="flex justify-between items-start mb-1">
          <h3 className="font-black text-gray-900 dark:text-gray-100 leading-tight pr-2 text-sm sm:text-base">{dish.name}</h3>
          <p className="font-black text-rose-600 dark:text-rose-400 text-sm sm:text-base">₹{dish.variations[0].price}</p>
        </div>
        
        <p className="text-[10px] sm:text-[11px] text-gray-400 dark:text-gray-500 line-clamp-2 mb-3 sm:mb-4 leading-relaxed h-7 sm:h-8">
          {dish.description}
        </p>

        <div className="flex items-center justify-between gap-2">
          <button
            disabled={!isAvailable}
            className={`flex-1 py-2.5 sm:py-3 rounded-xl border-2 font-black text-[9px] sm:text-[10px] uppercase tracking-wider transition-all ${isAvailable ? 'border-rose-50 dark:border-rose-900/20 bg-rose-50 dark:bg-rose-900/10 text-rose-600 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-900/20 hover:border-rose-100 dark:hover:border-rose-900/30' : 'bg-gray-100 dark:bg-gray-800 border-gray-100 dark:border-gray-800 text-gray-400 dark:text-gray-600'}`}
          >
            {isAvailable ? 'Add to Order' : 'Unavailable'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DishCard;
