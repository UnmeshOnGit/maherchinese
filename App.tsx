
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Dish, CartItem, Category, UserData, Variation, Review, Order } from './types';
import { DHRUVTAARA_MENU, CATEGORIES, REVIEWS, DELIVERY_ZONES } from './constants';
import DishCard from './components/DishCard';

const WHATSAPP_NUMBER = "7083374015";
const MIN_ORDER_VALUE = 200;
const MAPS_LINK = "https://maps.app.goo.gl/EwRATfCvY8i6xVnq7";
const REVIEW_LINK = "https://www.google.com/maps/place/Hotel+Dhruvtaara/@18.1549557,73.2995655,62m/data=!3m1!1e3!4m8!3m7!1s0x3be82df9e47a6ccf:0x30e47c87d757b9fd!8m2!3d18.1549429!4d73.299706!9m1!1b1!16s%2Fg%2F11z0yrq409?authuser=0&entry=ttu&g_ep=EgoyMDI2MDMyMy4xIKXMDSoASAFQAw%3D%3D";

// High-Fidelity SVG Component of the Dhruvtaara Logo
const DhruvtaaraLogo: React.FC<{ className?: string }> = ({ className = "w-12 h-12" }) => (
  <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
    {/* Outer Gold Border */}
    <circle cx="50" cy="50" r="48" fill="#FDFCFB" stroke="#D4AF37" strokeWidth="1.5"/>
    {/* Inner Maroon Circle */}
    <circle cx="50" cy="50" r="42" fill="#821f39" />
    {/* Gold Ring inside Maroon */}
    <circle cx="50" cy="50" r="38" fill="none" stroke="#D4AF37" strokeWidth="0.5" opacity="0.5"/>
    
    {/* HD Script Text */}
    <text x="50" y="52" textAnchor="middle" fill="#D4AF37" fontSize="32" fontWeight="300" style={{ fontFamily: "'Brush Script MT', cursive", filter: 'drop-shadow(0px 1px 1px rgba(0,0,0,0.3))' }}>HD</text>
    
    {/* Hotel Name */}
    <text x="50" y="68" textAnchor="middle" fill="#D4AF37" fontSize="5" fontWeight="700" style={{ letterSpacing: '1px', fontFamily: 'serif' }}>HOTEL</text>
    <text x="50" y="75" textAnchor="middle" fill="#D4AF37" fontSize="7" fontWeight="900" style={{ letterSpacing: '0.5px', fontFamily: 'serif' }}>DHRUVTAARA</text>
    
    {/* Sparkle */}
    <g transform="translate(78, 22)">
      <circle r="1" fill="#FFF" opacity="0.8">
        <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" />
      </circle>
      <path d="M-4 0 L4 0 M0 -4 L0 4" stroke="#FFF" strokeWidth="0.5" opacity="0.6">
        <animateTransform attributeName="transform" type="rotate" from="0" to="90" dur="3s" repeatCount="indefinite" />
      </path>
    </g>
  </svg>
);

// Order History Page Component
const PageHistory: React.FC<{ history: Order[], onDelete: (id: string) => void, onClearAll: () => void }> = ({ history, onDelete, onClearAll }) => {
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isClearingAll, setIsClearingAll] = useState(false);

  if (history.length === 0) {
    return (
      <div className="py-12 sm:py-20 text-center animate-in fade-in duration-500 px-6">
        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 rounded-[24px] sm:rounded-[32px] flex items-center justify-center text-3xl sm:text-4xl mx-auto mb-4 sm:mb-6 shadow-inner">📜</div>
        <h2 className="text-3xl sm:text-4xl font-black mb-3 sm:mb-4 dark:text-white">No Orders Yet</h2>
        <p className="text-gray-500 dark:text-gray-400 text-base sm:text-lg mb-8 max-w-xs mx-auto">Your delicious journey hasn't started yet. Let's explore our menu!</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {isClearingAll && (
        <div className="fixed inset-0 z-[150] bg-black/60 backdrop-blur-md flex items-center justify-center p-6 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-[#1A1A1A] rounded-[32px] sm:rounded-[40px] p-8 sm:p-10 max-w-sm w-full text-center shadow-2xl animate-scale-in">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-[24px] sm:rounded-[32px] flex items-center justify-center text-3xl sm:text-4xl mx-auto mb-4 sm:mb-6 shadow-inner">⚠️</div>
            <h3 className="text-xl sm:text-2xl font-black mb-2 dark:text-white">Clear History?</h3>
            <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm mb-6 sm:mb-8">This will permanently delete all your order history. This action cannot be undone.</p>
            <div className="flex flex-col gap-3">
              <button 
                onClick={() => { onClearAll(); setIsClearingAll(false); }} 
                className="w-full py-3.5 sm:py-4 bg-red-600 text-white rounded-2xl font-black text-sm shadow-xl shadow-red-200 dark:shadow-red-900/20 tap-scale"
              >
                Yes, Clear All
              </button>
              <button 
                onClick={() => setIsClearingAll(false)} 
                className="w-full py-3.5 sm:py-4 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-2xl font-black text-sm tap-scale"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row items-center justify-between mb-8 sm:mb-12 gap-4">
        <h2 className="text-3xl sm:text-4xl font-black dark:text-white">Order History</h2>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsClearingAll(true)}
            className="text-[10px] text-gray-400 hover:text-red-500 font-black uppercase tracking-widest transition-colors"
          >
            Clear All
          </button>
          <div className="bg-rose-50 dark:bg-rose-900/20 px-4 py-2 rounded-2xl text-rose-600 dark:text-rose-400 font-black text-xs uppercase tracking-widest">
            {history.length} {history.length === 1 ? 'Order' : 'Orders'}
          </div>
        </div>
      </div>
      
      <div className="space-y-6 sm:space-y-8">
        {history.map((order) => (
          <div key={order.id} className="bg-white dark:bg-[#1A1A1A] rounded-[32px] sm:rounded-[40px] border border-gray-100 dark:border-gray-800 overflow-hidden shadow-sm hover:shadow-xl transition-all group relative">
            {deletingId === order.id && (
              <div className="absolute inset-0 z-10 bg-white/90 dark:bg-black/90 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-200">
                <p className="font-black text-gray-900 dark:text-white mb-4">Delete this order?</p>
                <div className="flex gap-4">
                  <button onClick={() => setDeletingId(null)} className="px-6 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 font-bold text-sm">Cancel</button>
                  <button onClick={() => { onDelete(order.id); setDeletingId(null); }} className="px-6 py-2 rounded-xl bg-red-600 text-white font-bold text-sm shadow-lg shadow-red-200 dark:shadow-red-900/20">Delete</button>
                </div>
              </div>
            )}
            <div className="p-8">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div>
                  <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-1">Order ID</p>
                  <h3 className="font-black text-gray-900 dark:text-white">{order.id}</h3>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-1">Date & Time</p>
                  <p className="font-bold text-gray-600 dark:text-gray-400 text-sm">{order.date}</p>
                </div>
                <button 
                  onClick={() => setDeletingId(order.id)}
                  className="p-3 rounded-2xl bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors tap-scale"
                  title="Delete Order"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
              
              <div className="space-y-4 mb-8">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between py-3 border-b border-gray-50 dark:border-gray-800/50 last:border-0">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                      <div>
                        <p className="font-black text-gray-900 dark:text-white text-sm">{item.name}</p>
                        <p className="text-[10px] text-gray-400 uppercase font-bold">{item.selectedVariation.type} × {item.quantity}</p>
                      </div>
                    </div>
                    <p className="font-black text-gray-900 dark:text-white text-sm">₹{item.selectedVariation.price * item.quantity}</p>
                  </div>
                ))}
              </div>
              
              <div className="flex items-center justify-between pt-6 border-t border-gray-100 dark:border-gray-800">
                <div>
                  <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-1">Payment Method</p>
                  <p className="font-bold text-gray-600 dark:text-gray-400 text-sm">{order.paymentMethod || 'COD'}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-1">Total Paid</p>
                  <p className="text-2xl font-black text-rose-600 dark:text-rose-400">₹{order.total}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('dhruvtaara_theme') === 'dark';
  });
  const [activeTab, setActiveTab] = useState<'home' | 'menu' | 'reviews' | 'history' | 'contact' | 'favorites' | 'admin'>('home');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [dietFilter, setDietFilter] = useState<'all' | 'veg' | 'non-veg'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<(string | number)[]>([]);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);
  const [selectedVarIndex, setSelectedVarIndex] = useState(0);
  const [detailQuantity, setDetailQuantity] = useState(1);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [allReviews, setAllReviews] = useState<Review[]>(REVIEWS);
  const [orderHistory, setOrderHistory] = useState<Order[]>([]);
  const [animateCart, setAnimateCart] = useState(false);
  
  const [menuItems, setMenuItems] = useState<Dish[]>([]);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminToken, setAdminToken] = useState<string | null>(null);
  const [adminCredentials, setAdminCredentials] = useState({ username: '', password: '' });
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [adminError, setAdminError] = useState('');

  const fetchDishes = async () => {
    try {
      const response = await fetch('/api/dishes');
      const data = await response.json();
      setMenuItems(data);
    } catch (error) {
      console.error("Error fetching dishes:", error);
    }
  };

  useEffect(() => {
    fetchDishes();
  }, []);

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAdminError('');
    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(adminCredentials)
      });
      const data = await response.json();
      if (response.ok) {
        setAdminToken(data.token);
        setIsAdminLoggedIn(true);
        setShowAdminLogin(false);
        setActiveTab('admin');
      } else {
        setAdminError(data.message || 'Login failed');
      }
    } catch (error) {
      setAdminError('Server error');
    }
  };

  const toggleAvailability = async (dishId: string | number, currentStatus: boolean) => {
    try {
      const response = await fetch(`/api/dishes/${dishId}/availability`, {
        method: 'PATCH',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${adminToken}`
        },
        body: JSON.stringify({ available: !currentStatus })
      });
      if (response.ok) {
        console.log(`Successfully toggled availability for dish ${dishId}`);
        fetchDishes();
      } else {
        const errorData = await response.json();
        console.error("Failed to update availability:", errorData.message);
        alert(`Failed to update availability: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error updating availability:", error);
      alert("Error updating availability. Please check your connection.");
    }
  };

  const [paymentMethod, setPaymentMethod] = useState<'COD' | 'Online'>('COD');
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);

  const [userData, setUserData] = useState<UserData>({
    name: '',
    address: '',
    phone: '',
    area: DELIVERY_ZONES[0].name
  });

  const filterRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!filterRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - filterRef.current.offsetLeft);
    setScrollLeft(filterRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !filterRef.current) return;
    e.preventDefault();
    const x = e.pageX - filterRef.current.offsetLeft;
    const walk = (x - startX) * 2; 
    filterRef.current.scrollLeft = scrollLeft - walk;
  };

  const stopDragging = () => setIsDragging(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('dhruvtaara_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('dhruvtaara_theme', 'light');
    }
  }, [isDarkMode]);

  useEffect(() => {
    const savedUser = localStorage.getItem('dhruvtaara_user_data');
    const savedReviews = localStorage.getItem('dhruvtaara_custom_reviews');
    const savedOrders = localStorage.getItem('dhruvtaara_orders');
    const savedFavorites = localStorage.getItem('dhruvtaara_favorites');

    if (savedUser) setUserData(JSON.parse(savedUser));
    if (savedReviews) setAllReviews([...REVIEWS, ...JSON.parse(savedReviews)]);
    if (savedOrders) setOrderHistory(JSON.parse(savedOrders));
    if (savedFavorites) setFavorites(JSON.parse(savedFavorites));
  }, []);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cart.reduce((acc, item) => acc + (item.selectedVariation.price * item.quantity), 0);
  
  const currentDeliveryZone = useMemo(() => {
    return DELIVERY_ZONES.find(z => z.name === userData.area) || DELIVERY_ZONES[0];
  }, [userData.area]);

  const deliveryCharge = useMemo(() => {
    if (subtotal === 0) return 0;
    return currentDeliveryZone.fee;
  }, [subtotal, currentDeliveryZone]);

  const cartTotal = subtotal + deliveryCharge;

  useEffect(() => {
    if (cartCount > 0) {
      setAnimateCart(true);
      const timer = setTimeout(() => setAnimateCart(false), 300);
      return () => clearTimeout(timer);
    }
  }, [cartCount]);

  const avgRating = useMemo(() => {
    if (allReviews.length === 0) return 0;
    const total = allReviews.reduce((acc, r) => acc + r.rating, 0);
    return (total / allReviews.length).toFixed(1);
  }, [allReviews]);

  const toggleFavorite = (e: React.MouseEvent, dishId: string | number) => {
    e.stopPropagation();
    setFavorites(prev => {
      const updated = prev.includes(dishId) ? prev.filter(id => id !== dishId) : [...prev, dishId];
      localStorage.setItem('dhruvtaara_favorites', JSON.stringify(updated));
      return updated;
    });
  };

  const generateOrderId = () => {
    const now = new Date();
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const dd = String(now.getDate()).padStart(2, '0');
    const dateStr = `${dd}-${mm}`;
    const todayOrdersCount = orderHistory.filter(o => o.id.includes(dateStr)).length;
    const seq = String(todayOrdersCount + 1).padStart(3, '0');
    return `#MH-06-${dd}-${mm}-${seq}`;
  };

  const saveOrderToHistory = (order: Order) => {
    const updatedHistory = [order, ...orderHistory];
    setOrderHistory(updatedHistory);
    localStorage.setItem('dhruvtaara_orders', JSON.stringify(updatedHistory));
  };

  const deleteOrder = (orderId: string) => {
    const updatedHistory = orderHistory.filter(o => o.id !== orderId);
    setOrderHistory(updatedHistory);
    localStorage.setItem('dhruvtaara_orders', JSON.stringify(updatedHistory));
  };

  const clearAllHistory = () => {
    setOrderHistory([]);
    localStorage.removeItem('dhruvtaara_orders');
  };

  const addToCart = (dish: Dish, variation: Variation, quantity: number) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === dish.id && item.selectedVariation.type === variation.type);
      if (existing) {
        return prev.map(item => 
          (item.id === dish.id && item.selectedVariation.type === variation.type) 
          ? { ...item, quantity: item.quantity + quantity } 
          : item
        );
      }
      return [...prev, { ...dish, selectedVariation: variation, quantity }];
    });
    setIsDetailOpen(false);
    setDetailQuantity(1);
  };

  const updateQuantity = (dishId: number | string, varType: string, delta: number) => {
    setCart(prev => {
      return prev.map(item => {
        if (item.id === dishId && item.selectedVariation.type === varType) {
          const newQty = Math.max(0, item.quantity + delta);
          return { ...item, quantity: newQty };
        }
        return item;
      }).filter(item => item.quantity > 0);
    });
  };

  const handleConfirmOrder = () => {
    if (subtotal < (currentDeliveryZone.minOrder || MIN_ORDER_VALUE)) return;
    if (paymentMethod === 'Online') {
      setIsQRModalOpen(true);
    } else {
      finalizeOrder();
    }
  };

  const finalizeOrder = () => {
    const itemsText = cart.map(i => `• ${i.name} (${i.selectedVariation.type}) x ${i.quantity}`).join('\n');
    const message = `*Order Confirmation from Hotel Dhruvtaara*%0A%0A*Name:* ${userData.name}%0A*Area:* ${userData.area}%0A*Address:* ${userData.address}%0A*Payment:* ${paymentMethod}%0A%0A*Items:*%0A${itemsText}%0A%0A*Subtotal:* ₹${subtotal}%0A*Delivery Charge:* ₹${deliveryCharge}%0A*Total Payable:* ₹${cartTotal}`;
    
    const now = Date.now();
    const newOrder: Order = {
      id: generateOrderId(),
      items: [...cart],
      total: cartTotal,
      deliveryCharge: deliveryCharge,
      date: new Date().toLocaleString(),
      timestamp: now,
      status: 'Pending',
      userData: { ...userData }, // Snapshot of the current user data for this order
      paymentMethod: paymentMethod
    };
    saveOrderToHistory(newOrder);
    localStorage.setItem('dhruvtaara_user_data', JSON.stringify(userData));

    window.open(`https://wa.me/91${WHATSAPP_NUMBER}?text=${message}`, '_blank');
    
    setCart([]);
    setIsCheckoutOpen(false);
    setIsQRModalOpen(false);
    setActiveTab('history');
    setIsReviewModalOpen(true);
  };

  const filteredDishes = useMemo(() => {
    let result = menuItems;
    if (selectedCategory !== 'all') result = result.filter(d => d.category === selectedCategory);
    if (dietFilter === 'veg') result = result.filter(d => d.veg === true);
    if (dietFilter === 'non-veg') result = result.filter(d => d.veg === false);
    if (searchQuery) result = result.filter(d => d.name.toLowerCase().includes(searchQuery.toLowerCase()));
    return result;
  }, [menuItems, selectedCategory, dietFilter, searchQuery]);

  const favoriteDishes = useMemo(() => menuItems.filter(d => favorites.includes(d.id)), [menuItems, favorites]);

  // Optimized UPI String including precise amount and payee name
  const UPI_STRING = useMemo(() => {
    return `upi://pay?pa=unmeshsutar57@oksbi&pn=Hotel%20Dhruvtaara&am=${cartTotal}&cu=INR&tn=Hotel%20Dhruvtaara%20Order`;
  }, [cartTotal]);

  const QR_IMAGE_URL = useMemo(() => {
    return `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(UPI_STRING)}`;
  }, [UPI_STRING]);

  return (
    <div className="min-h-screen max-w-5xl mx-auto px-4 safe-bottom">
      <header className="sticky top-4 z-[70] glass-top rounded-[28px] px-8 py-5 mb-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/50 flex items-center justify-between">
        <div className="flex items-center gap-4 cursor-pointer" onClick={() => setActiveTab('home')}>
           <DhruvtaaraLogo className="w-12 h-12 shadow-lg shadow-rose-200 transition-transform active:scale-90" />
           <div className="flex flex-col">
             <h1 className="text-2xl font-cursive text-gold leading-none">Hotel Dhruvtaara</h1>
             <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">Lunch-Seafood-Chinese-Dessert-Ice-cream</p>
           </div>
        </div>
        <div className="flex items-center gap-3">
            {/* Theme Toggle Button */}
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)} 
              className="w-12 h-12 bg-white dark:bg-gray-800 rounded-[18px] border border-gray-100 dark:border-gray-700 flex items-center justify-center tap-scale shadow-sm text-gray-800 dark:text-gray-200"
              aria-label="Toggle Dark Mode"
            >
               {isDarkMode ? (
                 <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" fillRule="evenodd" clipRule="evenodd"></path></svg>
               ) : (
                 <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001a10.586 10.586 0 1010.586 10.586z"></path></svg>
               )}
            </button>
            {cartCount > 0 && (
                <button onClick={() => setIsCheckoutOpen(true)} className={`bg-rose-600 text-white px-5 py-2.5 rounded-2xl text-xs font-black shadow-xl shadow-rose-200 dark:shadow-rose-900/30 flex items-center gap-3 transition-all duration-300 ${animateCart ? 'scale-110 shadow-rose-300' : 'scale-100'}`}>
                    <span className="w-6 h-6 bg-white/20 rounded-lg flex items-center justify-center text-[10px] font-black">{cartCount}</span>
                    ₹{cartTotal}
                </button>
            )}
            <button onClick={() => setIsSideMenuOpen(true)} className="w-12 h-12 bg-white dark:bg-gray-800 rounded-[18px] border border-gray-100 dark:border-gray-700 flex items-center justify-center tap-scale shadow-sm">
               <svg className="w-6 h-6 text-gray-800 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16M4 18h16" /></svg>
            </button>
        </div>
      </header>

      <main className="mb-24">
        {activeTab === 'home' && (
           <div className="space-y-8 sm:space-y-12 pb-12 animate-in fade-in duration-500">
             <div className="relative h-[400px] sm:h-[480px] rounded-[32px] sm:rounded-[40px] overflow-hidden mt-4 shadow-xl">
               <img src="images/hero.jpg" className="w-full h-full object-cover" alt="Hotel Dhruvtaara Hero" referrerPolicy="no-referrer" />
               <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-6 sm:p-8">
                 <h1 className="text-3xl sm:text-4xl md:text-6xl font-black text-white mb-4 leading-tight">Best <br/> Authentic Chinese</h1>
                 <button onClick={() => setActiveTab('menu')} className="w-max bg-rose-600 text-white px-8 py-3.5 sm:px-10 sm:py-4 rounded-2xl font-black tap-scale shadow-xl shadow-rose-900/40 text-sm sm:text-base">Order Online</button>
               </div>
             </div>
             {favoriteDishes.length > 0 && (
                <div className="px-1 sm:px-2">
                   <div className="flex justify-between items-end mb-4 sm:mb-6">
                      <div>
                        <h2 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white">Your Favorites</h2>
                        <p className="text-gray-400 text-[10px] sm:text-xs font-bold uppercase tracking-widest mt-1">Dishes you love the most</p>
                      </div>
                      <button onClick={() => setActiveTab('favorites')} className="text-rose-600 dark:text-rose-400 font-black text-[9px] sm:text-[10px] uppercase tracking-widest px-3 py-1 bg-rose-50 dark:bg-rose-900/20 rounded-full">View All</button>
                   </div>
                   <div className="flex gap-4 sm:gap-6 overflow-x-auto no-scrollbar pb-6 mask-fade-right">
                      {favoriteDishes.slice(0, 5).map(dish => (
                        <div key={dish.id} className="min-w-[260px] sm:min-w-[280px]">
                          <DishCard dish={dish} isFavorite={favorites.includes(dish.id)} onToggleFavorite={toggleFavorite} onSelect={(d) => { if(dish.available) { setSelectedDish(d); setIsDetailOpen(true); } }} />
                        </div>
                      ))}
                   </div>
                </div>
             )}
             <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 px-1 sm:px-2">
                <div className="bg-white dark:bg-[#1A1A1A] p-4 sm:p-6 rounded-[24px] sm:rounded-[32px] border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col items-center text-center">
                   <div className="w-8 h-8 sm:w-10 sm:h-10 bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 rounded-lg sm:rounded-xl flex items-center justify-center mb-2 sm:mb-3 text-base sm:text-lg">🕒</div>
                   <p className="text-[8px] sm:text-[10px] text-gray-400 dark:text-gray-500 font-black uppercase tracking-widest mb-1">Opening Hours</p>
                   <p className="font-black text-[9px] sm:text-[11px] leading-tight dark:text-gray-200">12:00 PM to 12:00 AM</p>
                </div>
                <div className="bg-white dark:bg-[#1A1A1A] p-4 sm:p-6 rounded-[24px] sm:rounded-[32px] border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col items-center text-center">
                   <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-lg sm:rounded-xl flex items-center justify-center mb-2 sm:mb-3 text-base sm:text-lg">⚡</div>
                   <p className="text-[8px] sm:text-[10px] text-gray-400 dark:text-gray-500 font-black uppercase tracking-widest mb-1">Fast Preparation</p>
                   <p className="font-black text-[9px] sm:text-[11px] leading-tight dark:text-gray-200">Fresh food ready in 15-20 minutes</p>
                </div>
                <div className="bg-white dark:bg-[#1A1A1A] p-4 sm:p-6 rounded-[24px] sm:rounded-[32px] border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col items-center text-center">
                   <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg sm:rounded-xl flex items-center justify-center mb-2 sm:mb-3 text-base sm:text-lg">🍱</div>
                   <p className="text-[8px] sm:text-[10px] text-gray-400 dark:text-gray-500 font-black uppercase tracking-widest mb-1">70+ Dishes</p>
                   <p className="font-black text-[9px] sm:text-[11px] leading-tight dark:text-gray-200">Authentic Chinese taste</p>
                </div>
                <div className="bg-white dark:bg-[#1A1A1A] p-4 sm:p-6 rounded-[24px] sm:rounded-[32px] border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col items-center text-center">
                   <div className="w-8 h-8 sm:w-10 sm:h-10 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400 rounded-lg sm:rounded-xl flex items-center justify-center mb-2 sm:mb-3 text-base sm:text-lg">⭐</div>
                   <p className="text-[8px] sm:text-[10px] text-gray-400 dark:text-gray-500 font-black uppercase tracking-widest mb-1">Average Review</p>
                   <p className="font-black text-[9px] sm:text-[11px] leading-tight dark:text-gray-200">{avgRating} Stars Avg</p>
                </div>
             </div>
           </div>
        )}
        {activeTab === 'menu' && (
           <div className="animate-in fade-in duration-500">
              <div className="relative mb-4 sm:mb-6 group">
                <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-rose-600 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                </div>
                <input type="text" placeholder="Search for your favorite dishes..." className="w-full bg-white dark:bg-[#1A1A1A] border border-gray-100 dark:border-gray-800 rounded-[20px] sm:rounded-[24px] pl-14 pr-6 py-4 sm:py-5 text-sm font-bold focus:ring-4 focus:ring-rose-50 dark:focus:ring-rose-900/10 outline-none shadow-sm transition-all placeholder:text-gray-300 dark:placeholder:text-gray-600 dark:text-white" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
              </div>
              <div className="flex bg-gray-100/50 dark:bg-gray-800/30 p-1.5 rounded-[20px] sm:rounded-[24px] mb-4 max-w-sm mx-auto border border-gray-100 dark:border-gray-800 shadow-inner">
                <button onClick={() => setDietFilter('all')} className={`flex-1 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl text-[9px] sm:text-[10px] font-black uppercase tracking-widest transition-all ${dietFilter === 'all' ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm' : 'text-gray-400'}`}>All</button>
                <button onClick={() => setDietFilter('veg')} className={`flex-1 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl text-[9px] sm:text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${dietFilter === 'veg' ? 'bg-white dark:bg-gray-700 text-green-600 dark:text-green-400 shadow-sm' : 'text-gray-400'}`}><div className="w-2 h-2 rounded-full bg-green-600"></div> Veg</button>
                <button onClick={() => setDietFilter('non-veg')} className={`flex-1 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl text-[9px] sm:text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${dietFilter === 'non-veg' ? 'bg-white dark:bg-gray-700 text-red-600 dark:text-red-400 shadow-sm' : 'text-gray-400'}`}><div className="w-2 h-2 rounded-full bg-red-600"></div> Non-Veg</button>
              </div>
              <div ref={filterRef} onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={stopDragging} onMouseLeave={stopDragging} className="flex gap-2 sm:gap-3 overflow-x-auto translucent-scrollbar py-3 sm:py-4 no-scrollbar whitespace-nowrap mask-fade-right">
                {CATEGORIES.map(cat => (
                  <button key={cat.id} onClick={() => setSelectedCategory(cat.id)} className={`px-4 sm:px-6 py-3 sm:py-3.5 rounded-[16px] sm:rounded-[20px] border font-black text-[10px] sm:text-xs uppercase tracking-widest transition-all ${selectedCategory === cat.id ? 'bg-rose-600 border-rose-600 text-white shadow-xl shadow-rose-200 dark:shadow-rose-900/30' : 'bg-white dark:bg-[#1A1A1A] border-gray-100 dark:border-gray-800 text-gray-500'}`}>
                    <span>{cat.icon}</span> {cat.name}
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 mt-6 sm:mt-8">
                {filteredDishes.map(dish => (
                  <div key={dish.id} className="relative">
                    <DishCard dish={dish} isFavorite={favorites.includes(dish.id)} onToggleFavorite={toggleFavorite} onSelect={(d) => { if(dish.available) { setSelectedDish(d); setIsDetailOpen(true); } }} />
                  </div>
                ))}
              </div>
           </div>
        )}
        {activeTab === 'favorites' && (
           <div className="animate-in fade-in duration-500">
              <div className="mb-6 sm:mb-10 text-center px-4">
                <h2 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white">Your Favorites</h2>
                <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm sm:text-base">The dishes that always hit the spot.</p>
              </div>
              {favoriteDishes.length === 0 ? (
                <div className="py-16 sm:py-24 text-center bg-white dark:bg-[#1A1A1A] rounded-[32px] sm:rounded-[40px] border border-gray-100 dark:border-gray-800 shadow-sm mx-4">
                  <span className="text-5xl sm:text-6xl mb-4 sm:mb-6 block">💖</span>
                  <h3 className="font-black text-lg sm:text-xl text-gray-800 dark:text-gray-200">Your heart is empty</h3>
                  <button onClick={() => setActiveTab('menu')} className="mt-6 sm:mt-8 bg-rose-600 text-white px-8 py-3 rounded-2xl font-black tap-scale text-sm sm:text-base">Browse Menu</button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 px-4">
                  {favoriteDishes.map(dish => (
                    <DishCard key={dish.id} dish={dish} isFavorite={true} onToggleFavorite={toggleFavorite} onSelect={(d) => { if(dish.available) { setSelectedDish(d); setIsDetailOpen(true); } }} />
                  ))}
                </div>
              )}
           </div>
        )}
        {activeTab === 'admin' && isAdminLoggedIn && (
          <div className="animate-in fade-in duration-500 max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 sm:mb-10">
              <div>
                <h2 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white">Admin Panel</h2>
                <p className="text-gray-500 dark:text-gray-400 mt-1 sm:mt-2 text-sm sm:text-base">Manage menu item availability</p>
              </div>
              <button 
                onClick={() => { setIsAdminLoggedIn(false); setAdminToken(null); setActiveTab('menu'); }}
                className="px-6 py-3 bg-red-500 text-white rounded-2xl font-black text-xs uppercase tracking-widest tap-scale shadow-lg shadow-red-200 dark:shadow-none w-full sm:w-auto"
              >
                Logout
              </button>
            </div>
            
            <div className="grid gap-3 sm:gap-4">
              {menuItems.map((dish) => (
                <div key={dish.id} className="bg-white dark:bg-[#1A1A1A] p-4 sm:p-6 rounded-[24px] sm:rounded-[32px] border border-gray-100 dark:border-gray-800 shadow-sm flex items-center justify-between">
                  <div className="flex items-center gap-3 sm:gap-5 min-w-0">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl overflow-hidden shadow-inner bg-gray-100 dark:bg-gray-800 shrink-0">
                      <img src={dish.image} alt={dish.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-black text-sm sm:text-base text-gray-900 dark:text-white truncate">{dish.name}</h3>
                      <p className="text-[8px] sm:text-[10px] text-gray-400 uppercase font-black tracking-widest mt-0.5">{dish.category}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 sm:gap-4 shrink-0">
                    <span className={`hidden xs:block text-[8px] sm:text-[10px] font-black uppercase tracking-widest ${dish.available ? 'text-green-500' : 'text-red-500'}`}>
                      {dish.available ? 'Available' : 'Sold Out'}
                    </span>
                    <button 
                      onClick={() => toggleAvailability(dish.id, dish.available)}
                      className={`w-12 h-7 sm:w-14 sm:h-8 rounded-full relative transition-all duration-300 tap-scale ${dish.available ? 'bg-green-500 shadow-lg shadow-green-100 dark:shadow-none' : 'bg-gray-200 dark:bg-gray-800'}`}
                    >
                      <div 
                        className={`absolute top-1 w-5 h-5 sm:w-6 sm:h-6 bg-white rounded-full shadow-md transition-all duration-300 ${dish.available ? 'left-6 sm:left-7' : 'left-1'}`}
                      />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {activeTab === 'reviews' && (
          <div className="max-w-2xl mx-auto py-6 sm:py-8 animate-in fade-in duration-500 px-4">
             <div className="mb-6 sm:mb-10 text-center">
                <h2 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white">Guest Love</h2>
                <div className="flex items-center justify-center gap-1 text-yellow-500 font-black mt-2 text-sm sm:text-base"><span>★</span><span>{avgRating}</span></div>
             </div>
             <div className="space-y-4 sm:space-y-8">
                {allReviews.map(rev => (
                  <div key={rev.id} className="bg-white dark:bg-[#1A1A1A] p-6 sm:p-8 rounded-[32px] sm:rounded-[40px] border border-gray-100 dark:border-gray-800 shadow-sm">
                      <div className="flex items-center justify-between mb-4 sm:mb-6">
                          <div className="flex items-center gap-3 sm:gap-4">
                              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-rose-50 dark:bg-rose-900/20 rounded-xl sm:rounded-2xl flex items-center justify-center font-bold text-rose-600 dark:text-rose-400 text-base sm:text-lg shadow-inner">{rev.userName[0]}</div>
                              <div><h4 className="font-black text-sm sm:text-base text-gray-900 dark:text-gray-200">{rev.userName}</h4><p className="text-[9px] sm:text-[10px] text-gray-400 uppercase font-black tracking-widest">{rev.date}</p></div>
                          </div>
                          <div className="flex text-yellow-500 bg-yellow-50 dark:bg-yellow-900/10 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs">{[...Array(rev.rating)].map((_, i) => <span key={i}>★</span>)}</div>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 italic leading-relaxed sm:leading-loose text-base sm:text-lg">"{rev.comment}"</p>
                  </div>
                ))}
             </div>
          </div>
        )}
        {activeTab === 'history' && <PageHistory history={orderHistory} onDelete={deleteOrder} onClearAll={clearAllHistory} />}
        {activeTab === 'contact' && (
           <div className="py-12 sm:py-20 text-center animate-in fade-in duration-500 px-6">
             <div className="w-16 h-16 sm:w-20 sm:h-20 bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 rounded-[24px] sm:rounded-[32px] flex items-center justify-center text-3xl sm:text-4xl mx-auto mb-4 sm:mb-6 shadow-inner">📍</div>
             <h2 className="text-3xl sm:text-4xl font-black mb-3 sm:mb-4 dark:text-white">Visit Our Hotel</h2>
             <p className="text-gray-500 dark:text-gray-400 text-base sm:text-lg mb-2 max-w-lg mx-auto">Highway 99, Near M.T.E.S Doshi Vakil Arts College and G.c.u.b Science and Commerce College, Chinchavali, Goregaon, Maharashtra 402103 </p>
             <a href={MAPS_LINK} target="_blank" rel="noopener noreferrer" className="text-rose-600 dark:text-rose-400 font-bold text-xs sm:text-sm underline mb-4 block">View on Google Maps</a>
             <p className="font-black text-xl sm:text-2xl mt-4 text-rose-600 dark:text-rose-400">+91 {WHATSAPP_NUMBER}</p>
             <div className="flex flex-col sm:flex-row gap-4 mt-6 sm:mt-8 justify-center items-center">
                <a href={`https://wa.me/91${WHATSAPP_NUMBER}`} className="w-full sm:w-auto bg-green-500 text-white px-8 py-4 rounded-2xl font-black shadow-xl shadow-green-100 dark:shadow-green-900/20 tap-scale flex items-center justify-center gap-3 text-sm sm:text-base">WhatsApp Chat</a>
             </div>
           </div>
        )}
      </main>

      {isCheckoutOpen && (
        <div className="fixed inset-0 z-[110] flex items-end sm:items-center justify-center">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => setIsCheckoutOpen(false)}></div>
          <div className="relative bg-white dark:bg-[#121212] w-full sm:max-w-2xl mx-auto rounded-t-[40px] sm:rounded-[50px] animate-slide-up sm:animate-scale-in overflow-hidden shadow-2xl flex flex-col h-[98vh] sm:h-[92vh] sm:max-h-[850px]">
             <div className="px-6 py-5 sm:px-10 sm:py-8 flex justify-between items-center border-b border-gray-50 dark:border-gray-800 shrink-0">
               <h2 className="text-xl sm:text-3xl font-black tracking-tight dark:text-white">Finalize Order</h2>
               <button onClick={() => setIsCheckoutOpen(false)} className="w-10 h-10 rounded-full bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-gray-400 font-bold tap-scale">✕</button>
             </div>
             <div className="flex-1 overflow-y-auto p-5 sm:p-10 space-y-6 sm:space-y-8 no-scrollbar bg-[#FAFAFA] dark:bg-[#121212]">
                <div className="space-y-4">
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Personal Info</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input type="text" placeholder="Full Name" className="w-full bg-white dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 sm:px-6 sm:py-5 text-sm font-bold focus:ring-2 focus:ring-rose-500 outline-none shadow-sm dark:text-white" value={userData.name} onChange={e => setUserData({...userData, name: e.target.value})} />
                    <input type="tel" placeholder="Mobile Number" className="w-full bg-white dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 sm:px-6 sm:py-5 text-sm font-bold focus:ring-2 focus:ring-rose-500 outline-none shadow-sm dark:text-white" value={userData.phone} onChange={e => setUserData({...userData, phone: e.target.value})} />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Delivery Location</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                    {DELIVERY_ZONES.map(zone => (
                      <button key={zone.name} onClick={() => setUserData({...userData, area: zone.name})} className={`p-3 sm:p-4 rounded-2xl border-2 text-left transition-all tap-scale ${userData.area === zone.name ? 'border-rose-600 bg-rose-50 dark:bg-rose-900/10' : 'border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-800/30'}`}>
                        <p className={`text-[10px] sm:text-[11px] font-black leading-tight truncate ${userData.area === zone.name ? 'text-rose-600 dark:text-rose-400' : 'text-gray-900 dark:text-gray-200'}`}>{zone.name}</p>
                        <p className="text-[8px] sm:text-[9px] text-gray-400 font-bold mt-1">Fee: ₹{zone.fee}</p>
                      </button>
                    ))}
                  </div>
                  <textarea placeholder="Detailed Address" className="w-full bg-white dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 sm:px-6 sm:py-5 text-sm font-bold focus:ring-2 focus:ring-rose-500 outline-none h-24 resize-none shadow-sm mt-2 dark:text-white" value={userData.address} onChange={e => setUserData({...userData, address: e.target.value})} />
                </div>

                <div className="space-y-4">
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Payment Mode</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                     <button onClick={() => setPaymentMethod('COD')} className={`p-4 sm:p-6 rounded-[24px] sm:rounded-[30px] border-2 flex flex-row sm:flex-col items-center sm:items-start gap-3 sm:gap-1 transition-all tap-scale ${paymentMethod === 'COD' ? 'border-rose-600 bg-rose-50 dark:bg-rose-900/10 shadow-inner' : 'border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-800/30 shadow-sm'}`}>
                        <div className="flex items-center gap-3">
                           <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'COD' ? 'border-rose-600 dark:border-rose-400' : 'border-gray-300 dark:border-gray-600'}`}>{paymentMethod === 'COD' && <div className="w-2 h-2 bg-rose-600 dark:bg-rose-400 rounded-full"></div>}</div>
                           <span className="font-black text-gray-900 dark:text-white">COD</span>
                        </div>
                        <span className="text-[9px] sm:text-[10px] text-gray-400 font-bold uppercase tracking-widest">Pay on Delivery</span>
                     </button>
                     <button onClick={() => setPaymentMethod('Online')} className={`p-4 sm:p-6 rounded-[24px] sm:rounded-[30px] border-2 flex flex-row sm:flex-col items-center sm:items-start gap-3 sm:gap-1 transition-all tap-scale ${paymentMethod === 'Online' ? 'border-rose-600 bg-rose-50 dark:bg-rose-900/10 shadow-inner' : 'border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-800/30 shadow-sm'}`}>
                        <div className="flex items-center gap-3">
                           <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'Online' ? 'border-rose-600 dark:border-rose-400' : 'border-gray-300 dark:border-gray-600'}`}>{paymentMethod === 'Online' && <div className="w-2 h-2 bg-rose-600 dark:bg-rose-400 rounded-full"></div>}</div>
                           <span className="font-black text-gray-900 dark:text-white">Online</span>
                        </div>
                        <span className="text-[9px] sm:text-[10px] text-gray-400 font-bold uppercase tracking-widest">Scan UPI QR Code</span>
                     </button>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Items In Your Bag</h3>
                  <div className="space-y-3 sm:space-y-4 pb-6">
                    {cart.map(item => (
                      <div key={`${item.id}-${item.selectedVariation.type}`} className="flex justify-between items-center bg-white dark:bg-[#1A1A1A] p-3 sm:p-5 rounded-[24px] sm:rounded-[32px] shadow-sm border border-gray-100 dark:border-gray-800">
                         <div className="flex items-center gap-3 sm:gap-4">
                           <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl overflow-hidden shadow-inner bg-gray-100 dark:bg-gray-800 shrink-0">
                              <img src={item.image} className="w-full h-full object-cover" alt="" />
                           </div>
                           <div className="min-w-0">
                             <p className="font-black text-xs sm:text-sm text-gray-900 dark:text-white truncate">{item.name}</p>
                             <p className="text-[8px] sm:text-[10px] text-rose-500 dark:text-rose-400 uppercase font-black tracking-widest mt-0.5">{item.selectedVariation.type}</p>
                           </div>
                         </div>
                         <div className="flex flex-col items-end gap-2 sm:gap-3">
                            <div className="flex items-center gap-2 sm:gap-3 bg-rose-50 dark:bg-rose-900/20 p-1 rounded-full border border-rose-100 dark:border-rose-900/40">
                               <button onClick={() => updateQuantity(item.id, item.selectedVariation.type, -1)} className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white dark:bg-gray-700 text-rose-600 dark:text-rose-400 font-black shadow-sm flex items-center justify-center tap-scale">-</button>
                               <span className="font-black text-[10px] sm:text-xs text-rose-600 dark:text-rose-400 px-1 w-4 text-center">{item.quantity}</span>
                               <button onClick={() => updateQuantity(item.id, item.selectedVariation.type, 1)} className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-rose-600 dark:bg-rose-500 text-white font-black shadow-md flex items-center justify-center tap-scale">+</button>
                            </div>
                            <p className="font-black text-xs sm:text-sm text-gray-900 dark:text-white">₹{item.selectedVariation.price * item.quantity}</p>
                         </div>
                      </div>
                    ))}
                  </div>
                </div>
             </div>
             <div className="p-6 sm:p-8 border-t border-gray-50 dark:border-gray-800 bg-white dark:bg-[#121212] shadow-[0_-10px_40px_rgba(0,0,0,0.02)] shrink-0">
                <div className="space-y-1 mb-4 sm:mb-6">
                  <div className="flex justify-between items-center text-gray-400 text-[8px] sm:text-[9px] font-black uppercase tracking-widest"><span>Item Total</span><span>₹{subtotal}</span></div>
                  <div className="flex justify-between items-center text-gray-400 text-[8px] sm:text-[9px] font-black uppercase tracking-widest"><span>Delivery Fee</span><span>₹{deliveryCharge}</span></div>
                  <div className="h-px bg-gray-50 dark:bg-gray-800 my-1.5"></div>
                  <div className="flex justify-between items-center">
                    <div className="flex flex-col"><span className="text-[9px] sm:text-[10px] text-gray-400 font-black uppercase tracking-widest">Grand Total</span><span className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white">₹{cartTotal}</span></div>
                    <span className="text-[7px] sm:text-[8px] font-black uppercase tracking-widest text-rose-500 dark:text-rose-400 bg-rose-50 dark:bg-rose-900/20 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full border border-rose-100 dark:border-rose-900/40">{userData.area}</span>
                  </div>
                </div>
                {subtotal < (currentDeliveryZone.minOrder || MIN_ORDER_VALUE) && (
                  <div className="mb-4 p-2.5 sm:p-3 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/40 rounded-xl text-center">
                    <p className="text-[9px] sm:text-[10px] font-black text-red-600 dark:text-red-400 uppercase tracking-widest">
                      Min. order for {userData.area} is ₹{currentDeliveryZone.minOrder || MIN_ORDER_VALUE}
                    </p>
                    <p className="text-[8px] sm:text-[9px] text-red-500 mt-1">Please add ₹{(currentDeliveryZone.minOrder || MIN_ORDER_VALUE) - subtotal} more items to proceed.</p>
                  </div>
                )}
                <button onClick={handleConfirmOrder} disabled={!userData.name || !userData.address || !userData.phone || !userData.area || cart.length === 0 || subtotal < (currentDeliveryZone.minOrder || MIN_ORDER_VALUE)} className="w-full py-4 sm:py-5 bg-rose-600 text-white rounded-[20px] sm:rounded-[24px] font-black text-base sm:text-lg shadow-2xl shadow-rose-200 dark:shadow-rose-900/30 tap-scale disabled:bg-gray-100 dark:disabled:bg-gray-800 disabled:text-gray-300 transition-all active:scale-95">
                   {paymentMethod === 'Online' ? 'Proceed to Payment' : 'Confirm on WhatsApp'}
                </button>
             </div>
          </div>
        </div>
      )}

      {isQRModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
           <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => setIsQRModalOpen(false)}></div>
           <div className="relative bg-white dark:bg-[#1A1A1A] w-full max-w-sm rounded-[50px] overflow-hidden shadow-2xl animate-scale-in">
              <div className="p-10 text-center">
                 <div className="flex justify-center mb-4">
                   <DhruvtaaraLogo className="w-16 h-16 shadow-xl" />
                 </div>
                 <h2 className="text-2xl font-black mb-1 dark:text-white">Scan & Pay</h2>
                 <p className="text-rose-600 dark:text-rose-400 text-3xl font-black mb-2">₹{cartTotal}</p>
                 <p className="text-gray-400 text-[10px] mb-8 uppercase font-black tracking-widest">GPay, PhonePe, Paytm, etc.</p>
                 <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-[40px] mb-8 shadow-inner border border-gray-100 dark:border-gray-800 flex flex-col items-center">
                    <img src={QR_IMAGE_URL} className="w-full aspect-square object-contain rounded-2xl mb-4" alt="GPay QR Code" />
                    <p className="text-[9px] text-gray-400 dark:text-gray-500 font-bold uppercase tracking-tight">Payable to: unmeshsutar57@oksbi</p>
                 </div>
                 <div className="flex flex-col gap-3">
                    <button onClick={finalizeOrder} className="w-full py-5 bg-green-500 text-white rounded-[24px] font-black text-sm shadow-xl shadow-green-100 dark:shadow-green-900/20 tap-scale">I've Completed Payment</button>
                    <button onClick={() => setIsQRModalOpen(false)} className="text-[10px] text-gray-400 font-black uppercase tracking-widest py-2">Go Back</button>
                 </div>
              </div>
           </div>
        </div>
      )}

      {isReviewModalOpen && (
        <div className="fixed inset-0 z-[250] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => setIsReviewModalOpen(false)}></div>
          <div className="relative bg-white dark:bg-[#1A1A1A] w-full max-w-sm rounded-[50px] overflow-hidden shadow-2xl animate-scale-in">
            <button 
              onClick={() => setIsReviewModalOpen(false)} 
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-gray-400 font-bold tap-scale z-10"
            >
              ✕
            </button>
            <div className="p-10 text-center">
              <div className="w-20 h-20 bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 rounded-[32px] flex items-center justify-center text-4xl mx-auto mb-6 shadow-inner">⭐</div>
              <h2 className="text-2xl font-black mb-2 dark:text-white">How was your meal?</h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-8 leading-relaxed">Your feedback helps us grow! Would you like to share your experience on Google Maps?</p>
              
              <div className="flex flex-col gap-3">
                <button 
                  onClick={() => {
                    window.open(REVIEW_LINK, '_blank');
                    setIsReviewModalOpen(false);
                  }} 
                  className="w-full py-5 bg-rose-600 text-white rounded-[24px] font-black text-sm shadow-xl shadow-rose-200 dark:shadow-rose-900/30 tap-scale flex items-center justify-center gap-3"
                >
                  Write a Review
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </button>
                <button 
                  onClick={() => setIsReviewModalOpen(false)} 
                  className="text-[10px] text-gray-400 font-black uppercase tracking-widest py-2"
                >
                  Maybe Later
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showAdminLogin && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => setShowAdminLogin(false)}></div>
          <div className="relative bg-white dark:bg-[#1A1A1A] w-full max-w-sm rounded-[50px] overflow-hidden shadow-2xl animate-scale-in">
            <div className="p-10">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-black dark:text-white">Admin Login</h2>
                <button onClick={() => setShowAdminLogin(false)} className="text-gray-400 font-bold">✕</button>
              </div>
              <form onSubmit={handleAdminLogin} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Username</label>
                  <input 
                    type="text" 
                    value={adminCredentials.username}
                    onChange={(e) => setAdminCredentials({ ...adminCredentials, username: e.target.value })}
                    className="w-full bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 rounded-2xl px-6 py-4 text-sm font-bold focus:ring-2 focus:ring-rose-500 outline-none dark:text-white"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Password</label>
                  <input 
                    type="password" 
                    value={adminCredentials.password}
                    onChange={(e) => setAdminCredentials({ ...adminCredentials, password: e.target.value })}
                    className="w-full bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 rounded-2xl px-6 py-4 text-sm font-bold focus:ring-2 focus:ring-rose-500 outline-none dark:text-white"
                    required
                  />
                </div>
                {adminError && <p className="text-red-500 text-[10px] font-black uppercase tracking-widest text-center">{adminError}</p>}
                <button 
                  type="submit"
                  className="w-full py-5 bg-rose-600 text-white rounded-[24px] font-black text-sm shadow-xl shadow-rose-200 dark:shadow-rose-900/30 tap-scale"
                >
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      <nav className="fixed bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 z-[70] glass-top rounded-[24px] sm:rounded-[32px] p-1.5 sm:p-2 flex justify-between items-center shadow-2xl border border-white/50 dark:border-white/5">
        {[ { id: 'home', icon: '🏠', label: 'Home' }, { id: 'menu', icon: '📖', label: 'Menu' }, { id: 'reviews', icon: '⭐', label: 'Love' }, { id: 'history', icon: '🥡', label: 'Orders' }, { id: 'contact', icon: '📞', label: 'Contact' }].map(item => (
          <button key={item.id} onClick={() => setActiveTab(item.id as any)} className={`flex flex-col items-center gap-1 sm:gap-1.5 p-2 sm:p-3 flex-1 rounded-[18px] sm:rounded-[24px] transition-all tap-scale ${activeTab === item.id ? 'bg-rose-600 text-white shadow-xl shadow-rose-900/20' : 'text-gray-400'}`}>
            <span className="text-lg sm:text-xl">{item.icon}</span><span className="text-[8px] sm:text-[9px] font-black uppercase tracking-widest">{item.label}</span>
          </button>
        ))}
      </nav>

      {isDetailOpen && selectedDish && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-6">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => setIsDetailOpen(false)}></div>
            <div className="relative bg-white dark:bg-[#1A1A1A] w-full sm:max-w-xl rounded-t-[40px] sm:rounded-[40px] animate-slide-up sm:animate-scale-in overflow-hidden shadow-2xl max-h-[98vh] sm:max-h-[90vh] flex flex-col">
                <div className="relative shrink-0 h-64 sm:h-80">
                    <img src={selectedDish.image} className="w-full h-full object-cover" alt={selectedDish.name} />
                    <button 
                      onClick={() => setIsDetailOpen(false)} 
                      className="absolute top-5 right-5 w-10 h-10 sm:w-12 sm:h-12 bg-white/90 dark:bg-black/60 backdrop-blur-md rounded-full flex items-center justify-center text-rose-600 dark:text-rose-400 shadow-xl font-bold tap-scale z-30 border border-white/20"
                      aria-label="Close"
                    >
                      ✕
                    </button>
                </div>
                <div className="p-5 sm:p-10 relative z-10 bg-white dark:bg-[#1A1A1A] rounded-t-[32px] -mt-6 flex-1 overflow-y-auto no-scrollbar">
                    <div className="flex justify-between items-start mb-2">
                      <h2 className="text-xl sm:text-3xl font-black tracking-tight text-gray-900 dark:text-white leading-tight">{selectedDish.name}</h2>
                      <div className={`w-5 h-5 rounded-sm border shrink-0 mt-1 ${selectedDish.veg ? 'border-green-600 bg-green-50' : 'border-red-600 bg-red-50'} flex items-center justify-center`}>
                        <div className={`w-2.5 h-2.5 rounded-full ${selectedDish.veg ? 'bg-green-600' : 'bg-red-600'}`}></div>
                      </div>
                    </div>
                    <p className="text-gray-500 dark:text-gray-400 mb-6 sm:mb-8 text-xs sm:text-lg leading-relaxed">{selectedDish.description}</p>
                    <div className="space-y-6">
                        <p className="text-[9px] sm:text-[10px] text-gray-400 font-black uppercase tracking-widest ml-1">Select Portion</p>
                        <div className="flex gap-2 sm:gap-5">
                            {selectedDish.variations.map((v, idx) => (
                                <button key={idx} onClick={() => setSelectedVarIndex(idx)} className={`flex-1 p-3 sm:p-6 rounded-[20px] sm:rounded-[30px] border-2 transition-all tap-scale ${selectedVarIndex === idx ? 'border-rose-600 bg-rose-50 dark:bg-rose-900/10 shadow-inner' : 'border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/30'}`}>
                                    <span className={`text-[8px] sm:text-[10px] font-black uppercase tracking-[0.1em] mb-1 block ${selectedVarIndex === idx ? 'text-rose-600 dark:text-rose-400' : 'text-gray-400 dark:text-gray-500'}`}>{v.type}</span>
                                    <span className="font-black text-base sm:text-xl text-gray-900 dark:text-white">₹{v.price}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="mt-6 sm:mt-10 mb-6 sm:mb-12 flex items-center justify-between">
                       <p className="text-[9px] sm:text-[10px] text-gray-400 font-black uppercase tracking-widest ml-1">Set Quantity</p>
                       <div className="flex items-center gap-3 sm:gap-6 bg-gray-50 dark:bg-gray-800/50 p-1 sm:p-2 rounded-xl sm:rounded-3xl border border-gray-100 dark:border-gray-800">
                          <button onClick={() => setDetailQuantity(q => Math.max(1, q - 1))} className="w-9 h-9 sm:w-12 sm:h-12 rounded-lg sm:rounded-2xl bg-white dark:bg-gray-700 text-rose-600 dark:text-rose-400 font-black shadow-sm flex items-center justify-center tap-scale">-</button>
                          <span className="font-black text-lg sm:text-2xl text-gray-900 dark:text-white min-w-[2ch] text-center">{detailQuantity}</span>
                          <button onClick={() => setDetailQuantity(q => q + 1)} className="w-9 h-9 sm:w-12 sm:h-12 rounded-lg sm:rounded-2xl bg-rose-600 dark:bg-rose-500 text-white font-black shadow-xl flex items-center justify-center tap-scale">+</button>
                       </div>
                    </div>
                    <button onClick={() => addToCart(selectedDish, selectedDish.variations[selectedVarIndex], detailQuantity)} className="w-full py-4 sm:py-6 bg-rose-600 text-white rounded-[20px] sm:rounded-[30px] font-black text-base sm:text-xl shadow-2xl shadow-rose-200 dark:shadow-rose-900/30 tap-scale flex items-center justify-center gap-4 mb-4">
                      <span>Add to Order</span>
                      <div className="w-px h-6 bg-white/20"></div>
                      <span>₹{selectedDish.variations[selectedVarIndex].price * detailQuantity}</span>
                    </button>
                </div>
            </div>
        </div>
      )}

      {isSideMenuOpen && (
        <div className="fixed inset-0 z-[120] overflow-hidden">
           <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsSideMenuOpen(false)}></div>
           <div className="absolute left-0 top-0 bottom-0 w-[280px] sm:w-[300px] bg-white dark:bg-[#121212] animate-in slide-in-from-left duration-500 shadow-2xl flex flex-col rounded-r-[32px] sm:rounded-r-[40px] border-r border-gray-100 dark:border-gray-800">
              <div className="p-8 sm:p-10 border-b border-gray-50 dark:border-gray-800 bg-rose-50/20 dark:bg-rose-900/5 flex flex-col items-center">
                 <DhruvtaaraLogo className="w-16 h-16 sm:w-20 sm:h-20 mb-4 shadow-xl" />
                 <h2 className="font-cursive text-2xl sm:text-3xl text-gold tracking-tighter">Dhruvtaara</h2>
                 <p className="text-[9px] sm:text-[10px] text-gray-400 font-black uppercase tracking-widest mt-1 text-center">Lunch-Seafood-Chinese-Dessert-Ice-cream</p>
              </div>
                  <div className="flex-1 p-6 space-y-3 pt-8 overflow-y-auto no-scrollbar">
                     {[{ id: 'home', label: 'Home' }, { id: 'menu', label: 'Full Menu' }, { id: 'favorites', label: 'Your Favorites' }, { id: 'reviews', label: 'Guest Reviews' }, { id: 'history', label: 'Order History' }, { id: 'contact', label: 'Find Us' }].map(item => (
                       <button key={item.id} onClick={() => { setActiveTab(item.id as any); setIsSideMenuOpen(false); }} className={`w-full text-left p-5 rounded-[24px] font-black text-sm uppercase tracking-widest tap-scale transition-all ${activeTab === item.id ? 'bg-rose-600 text-white shadow-xl shadow-rose-200 dark:shadow-rose-900/30' : 'text-gray-600 dark:text-gray-400 hover:bg-rose-50 dark:hover:bg-gray-800'}`}>{item.label}</button>
                     ))}
                     <div className="h-px bg-gray-100 dark:bg-gray-800 my-4"></div>
                     <button 
                       onClick={() => { 
                         if (isAdminLoggedIn) {
                           setActiveTab('admin');
                         } else {
                           setShowAdminLogin(true);
                         }
                         setIsSideMenuOpen(false);
                       }} 
                       className={`w-full text-left p-5 rounded-[24px] font-black text-sm uppercase tracking-widest tap-scale transition-all ${activeTab === 'admin' ? 'bg-rose-600 text-white shadow-xl shadow-rose-200 dark:shadow-rose-900/30' : 'text-gray-600 dark:text-gray-400 hover:bg-rose-50 dark:hover:bg-gray-800'}`}
                     >
                       Admin Login
                     </button>
                  </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default App;
