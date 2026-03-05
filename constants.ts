
import { Dish, Category, Review } from './types';

export const DELIVERY_ZONES = [
  { name: 'Goregaon City', fee: 0, minOrder: 300 },
  { name: 'Chinchwali', fee: 0, minOrder: 300 },
  { name: 'Lonere', fee: 40, minOrder: 300 },
  { name: 'chinchwali wadi', fee: 0, minOrder: 300 },
  { name: 'Purar', fee: 40, minOrder: 300 },
  { name: 'Dahiwali', fee: 40, minOrder: 300 },
];

export const CATEGORIES: Category[] = [
  { id: 'all', name: 'All', icon: '✨' },
  { id: 'starters', name: 'Starters', icon: '🍗' },
  { id: 'soup', name: 'Soups', icon: '🥣' },
  { id: 'rice', name: 'Rice', icon: '🍚' },
  { id: 'noodles', name: 'Noodles', icon: '🍝' },
  { id: 'chopsy', name: 'Chopsy', icon: '🍜' },
  { id: 'chef-special', name: 'Specials', icon: '👨‍🍳' },
  { id: 'soft-drinks', name: 'Drinks', icon: '🥤' },
  { id: 'extras', name: 'Extras', icon: '🥚' },
];

export const MAHER_MENU: Dish[] = [
    {
      "id": 1,
      "name": "Munchurian Dry",
      "description": "Oil fried crispy cabbage munchurian",
      "category": "starters",
      "veg": true,
      "image": "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&q=80&w=400",
      "variations": [
        { "type": "half", "price": 80 },
        { "type": "full", "price": 150 }
      ],
      "available": true
    },
    {
      "id": 2,
      "name": "Munchurian Gravy",
      "description": "oil fried crispy cabbage munchurian with tasty gravy",
      "category": "starters",
      "veg": true,
      "image": "https://images.unsplash.com/photo-1512058560366-cd2427bb582c?auto=format&fit=crop&q=80&w=400",
      "variations": [
        { "type": "half", "price": 90 },
        { "type": "full", "price": 170 }
      ],
      "available": true
    },
    {
      "id": 3,
      "name": "Paneer 65",
      "description": "Spicy deep-fried cottage cheese cubes with southern flavors",
      "category": "starters",
      "veg": true,
      "image": "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&q=80&w=400",
      "variations": [
        { "type": "half", "price": 90 },
        { "type": "full", "price": 170 }
      ],
      "available": true
    },
    {
      "id": 4,
      "name": "Veg Crispy",
      "description": "Crispy fried vegetables tossed in tangy seasoning",
      "category": "starters",
      "veg": true,
      "image": "https://images.unsplash.com/photo-1623653387945-2fd25214f8fc?auto=format&fit=crop&q=80&w=400",
      "variations": [
        { "type": "half", "price": 120 },
        { "type": "full", "price": 220 }
      ],
      "available": true
    },
    {
      "id": 5,
      "name": "Paneer Crispy",
      "description": "Crispy cottage cheese coated with spices and fried",
      "category": "starters",
      "veg": true,
      "image": "https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&q=80&w=400",
      "variations": [
        { "type": "half", "price": 110 },
        { "type": "full", "price": 200 }
      ],
      "available": true
    },
    {
      "id": 6,
      "name": "Chinese Bhel",
      "description": "Crispy noodles tossed with tangy Indo-Chinese sauces and fresh veggies.",
      "category": "starters",
      "veg": true,
      "image": "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=400",
      "variations": [
        { "type": "half", "price": 60 },
        { "type": "full", "price": 140 }
      ],
      "available": true
    },
    {
      "id": 10,
      "name": "Baba Special Soup",
      "description": "House special hearty vegetable soup",
      "category": "soup",
      "veg": true,
      "image": "https://www.cookingcarnival.com/wp-content/uploads/2021/09/Vegetable-manchow-soup.webp",
      "variations": [
        {
          "type": "half",
          "price": 70
        },
        {
          "type": "full",
          "price": 120
        }
      ],
      "available": true
    },
    {
      "id": 52,
      "name": "Chicken 65",
      "description": "Spicy deep-fried chicken tossed in South Indian-style seasoning",
      "category": "starters",
      "veg": false,
      "image": "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&q=80&w=400",
      "variations": [
        { "type": "half", "price": 90 },
        { "type": "full", "price": 170 }
      ],
      "available": true
    },
    {
      "id": 53,
      "name": "Chicken Crispy",
      "description": "Crispy fried chicken tossed in tangy Indo-Chinese sauces",
      "category": "starters",
      "veg": false,
      "image": "https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&q=80&w=400",
      "variations": [
        { "type": "half", "price": 90 },
        { "type": "full", "price": 170 }
      ],
      "available": true
    }
];

export const REVIEWS: Review[] = [
  {
    id: 'r1',
    userName: 'Sameer K.',
    rating: 5,
    comment: 'Best Chicken Crispy in Goregaon! The quality is top-notch.',
    date: '2023-11-20'
  },
  {
    id: 'r2',
    userName: 'Anita P.',
    rating: 5,
    comment: 'Maher Special Rice is a must try. Fast delivery too.',
    date: '2023-11-15'
  }
];
