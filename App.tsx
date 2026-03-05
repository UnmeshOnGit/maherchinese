
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Dish, CartItem, Category, UserData, Variation, Review, Order } from './types';
import { MAHER_MENU, CATEGORIES, REVIEWS, DELIVERY_ZONES } from './constants';
import DishCard from './components/DishCard';

const WHATSAPP_NUMBER = "7083374015";
const MIN_ORDER_VALUE = 300;
const MAPS_LINK = "https://maps.app.goo.gl/ZN4zvcU9EQ4wWiA79";

// High-Fidelity SVG Component of the Maher Logo
const MaherLogo: React.FC<{ className?: string }> = ({ className = "w-12 h-12" }) => (
  <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="48" fill="#1A1A1A" stroke="#2A2A2A" strokeWidth="1"/>
    <circle cx="50" cy="50" r="42" fill="none" stroke="#333" strokeWidth="0.5"/>
    <path 
      d="M30 65 C 28 50, 25 35, 35 30 C 45 25, 48 45, 52 55 C 56 65, 60 30, 70 32 C 75 34, 72 55, 75 70" 
      fill="none" 
      stroke="#D91B5C" 
      strokeWidth="6" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <text x="50" y="80" textAnchor="middle" fill="#C5A059" fontSize="7" fontWeight="900" style={{ letterSpacing: '2px', fontFamily: 'serif' }}>MAHER</text>
    <text x="50" y="88" textAnchor="middle" fill="#C5A059" fontSize="6" fontWeight="700" style={{ letterSpacing: '1px', fontFamily: 'serif' }}>CHINESE</text>
    <line x1="40" y1="91" x2="60" y2="91" stroke="#D91B5C" strokeWidth="0.5" />
  </svg>
);

// Admin Order Panel with Sales Report
const AdminOrderPanel: React.FC<{ 
  orders: Order[], 
  onUpdateStatus: (orderId: string, newStatus: Order['status']) => void 
}> = ({ orders, onUpdateStatus }) => {
  const [filterStartDate, setFilterStartDate] = useState('');
  const [filterEndDate, setFilterEndDate] = useState('');
  const [activeView, setActiveView] = useState<'orders' | 'report'>('orders');

  const filteredOrders = useMemo(() => {
    return orders.filter(order => {
      if (!filterStartDate && !filterEndDate) return true;
      const orderDate = new Date(order.timestamp).setHours(0,0,0,0);
      const start = filterStartDate ? new Date(filterStartDate).setHours(0,0,0,0) : -Infinity;
      const end = filterEndDate ? new Date(filterEndDate).setHours(23,59,59,999) : Infinity;
      return orderDate >= start && orderDate <= end;
    });
  }, [orders, filterStartDate, filterEndDate]);

  const reportMetrics = useMemo(() => {
    const totalRevenue = filteredOrders.reduce((acc, curr) => acc + curr.total, 0);
    const orderCount = filteredOrders.length;
    const avgOrderValue = orderCount > 0 ? Math.round(totalRevenue / orderCount) : 0;
    
    const byStatus = filteredOrders.reduce((acc: any, curr) => {
      acc[curr.status] = (acc[curr.status] || 0) + curr.total;
      return acc;
    }, {});

    return { totalRevenue, orderCount, avgOrderValue, byStatus };
  }, [filteredOrders]);

  return (
    <div className="max-w-4xl mx-auto py-8 animate-in fade-in duration-500">
      <div className="mb-10 text-center">
        <h2 className="text-4xl font-black text-gray-900 dark:text-white">Admin Dashboard</h2>
        <p className="text-gray-500 dark:text-gray-400 mt-2">Manage operations and track business growth.</p>
      </div>

      <div className="flex bg-gray-100 dark:bg-gray-800/50 p-1.5 rounded-[24px] mb-8 max-w-sm mx-auto shadow-inner">
        <button onClick={() => setActiveView('orders')} className={`flex-1 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${activeView === 'orders' ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm' : 'text-gray-400'}`}>Orders List</button>
        <button onClick={() => setActiveView('report')} className={`flex-1 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${activeView === 'report' ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm' : 'text-gray-400'}`}>Sales Report</button>
      </div>

      <div className="bg-white dark:bg-[#1A1A1A] p-6 rounded-[32px] border border-gray-100 dark:border-gray-800 shadow-sm mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
           <div>
             <label className="text-[9px] font-black uppercase text-gray-400 ml-1 mb-1 block">Start Date</label>
             <input type="date" className="w-full bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 rounded-xl px-4 py-3 text-xs font-bold outline-none focus:ring-2 focus:ring-rose-50 dark:focus:ring-rose-900/20 text-gray-900 dark:text-white" value={filterStartDate} onChange={(e) => setFilterStartDate(e.target.value)} />
           </div>
           <div>
             <label className="text-[9px] font-black uppercase text-gray-400 ml-1 mb-1 block">End Date</label>
             <input type="date" className="w-full bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 rounded-xl px-4 py-3 text-xs font-bold outline-none focus:ring-2 focus:ring-rose-50 dark:focus:ring-rose-900/20 text-gray-900 dark:text-white" value={filterEndDate} onChange={(e) => setFilterEndDate(e.target.value)} />
           </div>
        </div>
        {(filterStartDate || filterEndDate) && (
          <button onClick={() => { setFilterStartDate(''); setFilterEndDate(''); }} className="mt-4 text-[9px] font-black uppercase text-rose-500 underline">Clear Filters</button>
        )}
      </div>

      {activeView === 'report' ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
             <div className="bg-white dark:bg-[#1A1A1A] p-8 rounded-[40px] border border-gray-100 dark:border-gray-800 shadow-sm text-center">
                <span className="text-3xl mb-4 block">💰</span>
                <p className="text-[10px] text-gray-400 dark:text-gray-500 font-black uppercase tracking-widest mb-1">Total Revenue</p>
                <p className="text-3xl font-black text-rose-600">₹{reportMetrics.totalRevenue}</p>
             </div>
             <div className="bg-white dark:bg-[#1A1A1A] p-8 rounded-[40px] border border-gray-100 dark:border-gray-800 shadow-sm text-center">
                <span className="text-3xl mb-4 block">📈</span>
                <p className="text-[10px] text-gray-400 dark:text-gray-500 font-black uppercase tracking-widest mb-1">Total Orders</p>
                <p className="text-3xl font-black text-gray-900 dark:text-white">{reportMetrics.orderCount}</p>
             </div>
             <div className="bg-white dark:bg-[#1A1A1A] p-8 rounded-[40px] border border-gray-100 dark:border-gray-800 shadow-sm text-center">
                <span className="text-3xl mb-4 block">⚖️</span>
                <p className="text-[10px] text-gray-400 dark:text-gray-500 font-black uppercase tracking-widest mb-1">Avg. Order Value</p>
                <p className="text-3xl font-black text-blue-600 dark:text-blue-400">₹{reportMetrics.avgOrderValue}</p>
             </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredOrders.length === 0 ? (
            <div className="py-20 text-center bg-white dark:bg-[#1A1A1A] rounded-[40px] border border-gray-100 dark:border-gray-800 shadow-sm">
              <span className="text-6xl mb-6 block">🔎</span>
              <h3 className="font-black text-xl text-gray-800 dark:text-gray-200">No matching orders</h3>
            </div>
          ) : (
            filteredOrders.map((order) => (
              <div key={order.id} className="bg-white dark:bg-[#1A1A1A] p-8 rounded-[40px] border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden relative">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <div className="flex items-center gap-3">
                      <h4 className="font-black text-gray-900 dark:text-white text-lg">{order.id}</h4>
                      <span className="bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">{order.paymentMethod || 'COD'}</span>
                    </div>
                    <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest mt-1">{order.date}</p>
                  </div>
                  <div className="text-right">
                     <p className="font-black text-gray-900 dark:text-white text-sm">{order.userData?.name || 'Guest'}</p>
                     <p className="text-[10px] text-gray-500 dark:text-gray-400 font-bold uppercase tracking-tight mt-0.5">{order.userData?.area}</p>
                     <p className="text-[10px] text-gray-400 font-medium max-w-[200px] leading-tight mt-1">{order.userData?.address}</p>
                     {order.userData?.phone && <a href={`tel:${order.userData.phone}`} className="text-[10px] text-rose-600 dark:text-rose-400 font-black mt-2 block hover:underline">📞 {order.userData.phone}</a>}
                  </div>
                </div>
                
                <div className="space-y-3 mb-6 bg-gray-50 dark:bg-gray-800/30 p-6 rounded-[28px]">
                  {order.items.map((item: any, idx: number) => (
                    <div key={idx} className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-300 font-medium">{item.name} <span className="text-gray-400 font-bold ml-1">({item.selectedVariation?.type || 'Standard'})</span> x {item.quantity}</span>
                      <span className="font-black text-gray-900 dark:text-white">₹{(item.selectedVariation?.price || 0) * item.quantity}</span>
                    </div>
                  ))}
                  {order.deliveryCharge > 0 && (
                    <div className="flex justify-between text-sm pt-2 border-t border-gray-100 dark:border-gray-800">
                      <span className="text-gray-500 dark:text-gray-400 font-bold italic">Delivery Charge</span>
                      <span className="font-black text-gray-900 dark:text-white">₹{order.deliveryCharge}</span>
                    </div>
                  )}
                </div>
                
                <div className="pt-6 flex justify-between items-center border-t border-gray-50 dark:border-gray-800">
                  <div className="flex flex-col">
                      <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Total Bill</span>
                      <span className="text-2xl font-black text-green-600 dark:text-green-500">₹{order.total}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[9px] font-black uppercase text-gray-400">Status:</span>
                    <select value={order.status} onChange={(e) => onUpdateStatus(order.id, e.target.value as Order['status'])} className="bg-gray-100 dark:bg-gray-800 border-none rounded-xl px-4 py-3 text-[10px] font-black uppercase tracking-widest outline-none shadow-sm cursor-pointer focus:ring-2 focus:ring-rose-50 dark:focus:ring-rose-900/20 text-gray-900 dark:text-white">
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

const PageHistory: React.FC<{ history: Order[] }> = ({ history }) => {
  return (
    <div className="max-w-2xl mx-auto py-8 animate-in fade-in duration-500">
      <div className="mb-10 text-center">
        <h2 className="text-4xl font-black text-gray-900 dark:text-white">Your Orders</h2>
        <p className="text-gray-500 dark:text-gray-400 mt-2">Track your past delights.</p>
      </div>
      {history.length === 0 ? (
        <div className="py-20 text-center bg-white dark:bg-[#1A1A1A] rounded-[40px] border border-gray-100 dark:border-gray-800 shadow-sm">
          <span className="text-6xl mb-6 block">🍝</span>
          <h3 className="font-black text-xl text-gray-800 dark:text-gray-200">No orders yet</h3>
        </div>
      ) : (
        <div className="space-y-6">
          {history.map((order) => (
            <div key={order.id} className="bg-white dark:bg-[#1A1A1A] p-8 rounded-[40px] border border-gray-100 dark:border-gray-800 shadow-sm">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h4 className="font-black text-gray-900 dark:text-white text-lg">{order.id}</h4>
                  <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest mt-1">{order.date}</p>
                </div>
              </div>
              <div className="space-y-3 mb-6">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-300 font-medium">{item.name} ({item.selectedVariation.type}) x {item.quantity}</span>
                    <span className="font-black text-gray-900 dark:text-white">₹{item.selectedVariation.price * item.quantity}</span>
                  </div>
                ))}
                {order.deliveryCharge > 0 && (
                  <div className="flex justify-between text-[11px] pt-1 text-gray-400 italic">
                    <span>Delivery Charge ({order.userData?.area || 'Standard'})</span>
                    <span>₹{order.deliveryCharge}</span>
                  </div>
                )}
              </div>
              <div className="pt-6 border-t border-gray-50 dark:border-gray-800 flex justify-between items-center">
                <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Total Amount</span>
                <span className="text-xl font-black text-rose-600 dark:text-rose-400">₹{order.total}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('maher_theme') === 'dark';
  });
  const [activeTab, setActiveTab] = useState<'home' | 'menu' | 'reviews' | 'history' | 'contact' | 'admin_dashboard' | 'favorites'>('home');
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
  const [adminOrderHistory, setAdminOrderHistory] = useState<Order[]>([]);
  const [animateCart, setAnimateCart] = useState(false);
  
  const [menuItems, setMenuItems] = useState<Dish[]>(MAHER_MENU);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);
  const [adminCreds, setAdminCreds] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');

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
      localStorage.setItem('maher_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('maher_theme', 'light');
    }
  }, [isDarkMode]);

  useEffect(() => {
    const savedUser = localStorage.getItem('maher_user_data');
    const savedReviews = localStorage.getItem('maher_custom_reviews');
    const savedOrders = localStorage.getItem('maher_orders');
    const savedAdminOrders = localStorage.getItem('maher_admin_all_orders');
    const savedMenu = localStorage.getItem('maher_menu_availability');
    const savedFavorites = localStorage.getItem('maher_favorites');

    if (savedUser) setUserData(JSON.parse(savedUser));
    if (savedReviews) setAllReviews([...REVIEWS, ...JSON.parse(savedReviews)]);
    if (savedOrders) setOrderHistory(JSON.parse(savedOrders));
    if (savedAdminOrders) setAdminOrderHistory(JSON.parse(savedAdminOrders));
    if (savedFavorites) setFavorites(JSON.parse(savedFavorites));
    if (savedMenu) {
      const availabilityMap = JSON.parse(savedMenu);
      setMenuItems(prev => prev.map(item => ({
        ...item,
        available: availabilityMap[item.id] !== undefined ? availabilityMap[item.id] : item.available
      })));
    }
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

  const toggleAvailability = (dishId: string | number) => {
    setMenuItems(prev => {
      const updated = prev.map(item => item.id === dishId ? { ...item, available: !item.available } : item);
      const availabilityMap = updated.reduce((acc: any, item) => {
        acc[item.id] = item.available;
        return acc;
      }, {});
      localStorage.setItem('maher_menu_availability', JSON.stringify(availabilityMap));
      return updated;
    });
  };

  const toggleFavorite = (e: React.MouseEvent, dishId: string | number) => {
    e.stopPropagation();
    setFavorites(prev => {
      const updated = prev.includes(dishId) ? prev.filter(id => id !== dishId) : [...prev, dishId];
      localStorage.setItem('maher_favorites', JSON.stringify(updated));
      return updated;
    });
  };

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminCreds.username === 'maherchinese' && adminCreds.password === 'maherchineseadmin') {
      setIsAdminMode(true);
      setIsAdminLoginOpen(false);
      setIsSideMenuOpen(false);
      setAdminCreds({ username: '', password: '' });
      setLoginError('');
      setActiveTab('admin_dashboard');
    } else {
      setLoginError('Invalid username or password');
    }
  };

  const generateOrderId = () => {
    const now = new Date();
    const yy = String(now.getFullYear()).slice(-2);
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const dd = String(now.getDate()).padStart(2, '0');
    const dateStr = `${yy}-${mm}-${dd}`;
    const todayOrdersCount = adminOrderHistory.filter(o => o.id.includes(dateStr)).length;
    const seq = String(todayOrdersCount + 1).padStart(3, '0');
    return `#MH${dateStr}-${seq}`;
  };

  const updateOrderStatus = (orderId: string, newStatus: Order['status']) => {
    setAdminOrderHistory(prev => {
      const updated = prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o);
      localStorage.setItem('maher_admin_all_orders', JSON.stringify(updated));
      return updated;
    });
    setOrderHistory(prev => {
      const updated = prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o);
      localStorage.setItem('maher_orders', JSON.stringify(updated));
      return updated;
    });
  };

  const saveOrderToHistory = (order: Order) => {
    const updatedHistory = [order, ...orderHistory];
    setOrderHistory(updatedHistory);
    localStorage.setItem('maher_orders', JSON.stringify(updatedHistory));

    const adminEntry = {
        ...order,
        paymentMethod: paymentMethod
    };
    const updatedAdminHistory = [adminEntry, ...adminOrderHistory];
    setAdminOrderHistory(updatedAdminHistory);
    localStorage.setItem('maher_admin_all_orders', JSON.stringify(updatedAdminHistory));
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
    const message = `*Order Confirmation from Maher Chinese*%0A%0A*Name:* ${userData.name}%0A*Area:* ${userData.area}%0A*Address:* ${userData.address}%0A*Payment:* ${paymentMethod}%0A%0A*Items:*%0A${itemsText}%0A%0A*Subtotal:* ₹${subtotal}%0A*Delivery Charge:* ₹${deliveryCharge}%0A*Total Payable:* ₹${cartTotal}`;
    
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
    localStorage.setItem('maher_user_data', JSON.stringify(userData));

    window.open(`https://wa.me/91${WHATSAPP_NUMBER}?text=${message}`, '_blank');
    
    setCart([]);
    setIsCheckoutOpen(false);
    setIsQRModalOpen(false);
    setActiveTab('history');
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
    return `upi://pay?pa=unmeshsutar57@oksbi&pn=Maher%20Chinese&am=${cartTotal}&cu=INR&tn=Maher%20Chinese%20Order`;
  }, [cartTotal]);

  const QR_IMAGE_URL = useMemo(() => {
    return `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(UPI_STRING)}`;
  }, [UPI_STRING]);

  return (
    <div className="min-h-screen max-w-5xl mx-auto px-4 safe-bottom">
      <header className="sticky top-4 z-[70] glass-top rounded-[28px] px-8 py-5 mb-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/50 flex items-center justify-between">
        <div className="flex items-center gap-4 cursor-pointer" onClick={() => setActiveTab('home')}>
           <MaherLogo className="w-12 h-12 shadow-lg shadow-rose-200 transition-transform active:scale-90" />
           <div className="flex flex-col">
             <h1 className="text-base font-black leading-none text-gray-900 dark:text-white">Maher Chinese</h1>
             <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">Premium Kitchen</p>
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
           <div className="space-y-12 pb-12 animate-in fade-in duration-500">
             <div className="relative h-[480px] rounded-[40px] overflow-hidden mt-4 shadow-xl">
               <img src="https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover" alt="Hero" />
               <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-8">
                 <h1 className="text-4xl md:text-6xl font-black text-white mb-4 leading-tight">The Art of <br/>Authentic Chinese</h1>
                 <button onClick={() => setActiveTab('menu')} className="w-max bg-rose-600 text-white px-10 py-4 rounded-2xl font-black tap-scale shadow-xl shadow-rose-900/40">Order Online</button>
               </div>
             </div>
             {favoriteDishes.length > 0 && (
                <div className="px-2">
                   <div className="flex justify-between items-end mb-6">
                      <div>
                        <h2 className="text-2xl font-black text-gray-900 dark:text-white">Your Favorites</h2>
                        <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mt-1">Dishes you love the most</p>
                      </div>
                      <button onClick={() => setActiveTab('favorites')} className="text-rose-600 dark:text-rose-400 font-black text-[10px] uppercase tracking-widest px-3 py-1 bg-rose-50 dark:bg-rose-900/20 rounded-full">View All</button>
                   </div>
                   <div className="flex gap-6 overflow-x-auto no-scrollbar pb-6 mask-fade-right">
                      {favoriteDishes.slice(0, 5).map(dish => (
                        <div key={dish.id} className="min-w-[280px]">
                          <DishCard dish={dish} isFavorite={favorites.includes(dish.id)} onToggleFavorite={toggleFavorite} onSelect={(d) => { if(dish.available || isAdminMode) { setSelectedDish(d); setIsDetailOpen(true); } }} />
                        </div>
                      ))}
                   </div>
                </div>
             )}
             <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-2">
                <div className="bg-white dark:bg-[#1A1A1A] p-6 rounded-[32px] border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col items-center text-center">
                   <div className="w-10 h-10 bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 rounded-xl flex items-center justify-center mb-3 text-lg">🕒</div>
                   <p className="text-[10px] text-gray-400 dark:text-gray-500 font-black uppercase tracking-widest mb-1">Opening Hours</p>
                   <p className="font-black text-[11px] leading-tight dark:text-gray-200">12:00 PM to 12:00 AM</p>
                </div>
                <div className="bg-white dark:bg-[#1A1A1A] p-6 rounded-[32px] border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col items-center text-center">
                   <div className="w-10 h-10 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-xl flex items-center justify-center mb-3 text-lg">⚡</div>
                   <p className="text-[10px] text-gray-400 dark:text-gray-500 font-black uppercase tracking-widest mb-1">Fast Preparation</p>
                   <p className="font-black text-[11px] leading-tight dark:text-gray-200">Fresh food ready in 15-20 minutes</p>
                </div>
                <div className="bg-white dark:bg-[#1A1A1A] p-6 rounded-[32px] border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col items-center text-center">
                   <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center mb-3 text-lg">🍱</div>
                   <p className="text-[10px] text-gray-400 dark:text-gray-500 font-black uppercase tracking-widest mb-1">70+ Dishes</p>
                   <p className="font-black text-[11px] leading-tight dark:text-gray-200">Authentic Chinese taste</p>
                </div>
                <div className="bg-white dark:bg-[#1A1A1A] p-6 rounded-[32px] border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col items-center text-center">
                   <div className="w-10 h-10 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400 rounded-xl flex items-center justify-center mb-3 text-lg">⭐</div>
                   <p className="text-[10px] text-gray-400 dark:text-gray-500 font-black uppercase tracking-widest mb-1">Average Review</p>
                   <p className="font-black text-[11px] leading-tight dark:text-gray-200">{avgRating} Stars Avg</p>
                </div>
             </div>
           </div>
        )}
        {activeTab === 'menu' && (
           <div className="animate-in fade-in duration-500">
              <div className="relative mb-6 group">
                <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-rose-600 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                </div>
                <input type="text" placeholder="Search for your favorite dishes..." className="w-full bg-white dark:bg-[#1A1A1A] border border-gray-100 dark:border-gray-800 rounded-[24px] pl-14 pr-6 py-5 text-sm font-bold focus:ring-4 focus:ring-rose-50 dark:focus:ring-rose-900/10 outline-none shadow-sm transition-all placeholder:text-gray-300 dark:placeholder:text-gray-600 dark:text-white" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
              </div>
              <div className="flex bg-gray-100/50 dark:bg-gray-800/30 p-1.5 rounded-[24px] mb-4 max-w-sm mx-auto border border-gray-100 dark:border-gray-800 shadow-inner">
                <button onClick={() => setDietFilter('all')} className={`flex-1 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${dietFilter === 'all' ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm' : 'text-gray-400'}`}>All</button>
                <button onClick={() => setDietFilter('veg')} className={`flex-1 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${dietFilter === 'veg' ? 'bg-white dark:bg-gray-700 text-green-600 dark:text-green-400 shadow-sm' : 'text-gray-400'}`}><div className="w-2 h-2 rounded-full bg-green-600"></div> Veg</button>
                <button onClick={() => setDietFilter('non-veg')} className={`flex-1 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${dietFilter === 'non-veg' ? 'bg-white dark:bg-gray-700 text-red-600 dark:text-red-400 shadow-sm' : 'text-gray-400'}`}><div className="w-2 h-2 rounded-full bg-red-600"></div> Non-Veg</button>
              </div>
              <div ref={filterRef} onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={stopDragging} onMouseLeave={stopDragging} className="flex gap-3 overflow-x-auto translucent-scrollbar py-4 no-scrollbar whitespace-nowrap mask-fade-right">
                {CATEGORIES.map(cat => (
                  <button key={cat.id} onClick={() => setSelectedCategory(cat.id)} className={`px-6 py-3.5 rounded-[20px] border font-black text-xs uppercase tracking-widest transition-all ${selectedCategory === cat.id ? 'bg-rose-600 border-rose-600 text-white shadow-xl shadow-rose-200 dark:shadow-rose-900/30' : 'bg-white dark:bg-[#1A1A1A] border-gray-100 dark:border-gray-800 text-gray-500'}`}>
                    <span>{cat.icon}</span> {cat.name}
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
                {filteredDishes.map(dish => (
                  <div key={dish.id} className="relative">
                    <DishCard dish={dish} isFavorite={favorites.includes(dish.id)} onToggleFavorite={toggleFavorite} onSelect={(d) => { if(dish.available || isAdminMode) { setSelectedDish(d); setIsDetailOpen(true); } }} />
                    {isAdminMode && (
                      <div className="absolute top-4 right-14 z-20 flex items-center gap-2 bg-white/90 dark:bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-full shadow-lg border border-gray-100 dark:border-gray-800 scale-90">
                         <span className={`text-[8px] font-black uppercase tracking-widest ${dish.available ? 'text-green-600 dark:text-green-400' : 'text-red-500'}`}>{dish.available ? 'Available' : 'Sold Out'}</span>
                         <button onClick={(e) => { e.stopPropagation(); toggleAvailability(dish.id); }} className={`w-8 h-4 rounded-full relative transition-colors ${dish.available ? 'bg-green-500' : 'bg-gray-300'}`}><div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all ${dish.available ? 'right-0.5' : 'left-0.5'}`}></div></button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
           </div>
        )}
        {activeTab === 'favorites' && (
           <div className="animate-in fade-in duration-500">
              <div className="mb-10 text-center">
                <h2 className="text-4xl font-black text-gray-900 dark:text-white">Your Favorites</h2>
                <p className="text-gray-500 dark:text-gray-400 mt-2">The dishes that always hit the spot.</p>
              </div>
              {favoriteDishes.length === 0 ? (
                <div className="py-24 text-center bg-white dark:bg-[#1A1A1A] rounded-[40px] border border-gray-100 dark:border-gray-800 shadow-sm">
                  <span className="text-6xl mb-6 block">💖</span>
                  <h3 className="font-black text-xl text-gray-800 dark:text-gray-200">Your heart is empty</h3>
                  <button onClick={() => setActiveTab('menu')} className="mt-8 bg-rose-600 text-white px-8 py-3 rounded-2xl font-black tap-scale">Browse Menu</button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {favoriteDishes.map(dish => (
                    <DishCard key={dish.id} dish={dish} isFavorite={true} onToggleFavorite={toggleFavorite} onSelect={(d) => { if(dish.available || isAdminMode) { setSelectedDish(d); setIsDetailOpen(true); } }} />
                  ))}
                </div>
              )}
           </div>
        )}
        {activeTab === 'reviews' && (
          <div className="max-w-2xl mx-auto py-8 animate-in fade-in duration-500">
             <div className="mb-10 text-center">
                <h2 className="text-4xl font-black text-gray-900 dark:text-white">Guest Love</h2>
                <div className="flex items-center justify-center gap-1 text-yellow-500 font-black mt-2"><span>★</span><span>{avgRating}</span></div>
             </div>
             <div className="space-y-8">
                {allReviews.map(rev => (
                  <div key={rev.id} className="bg-white dark:bg-[#1A1A1A] p-8 rounded-[40px] border border-gray-100 dark:border-gray-800 shadow-sm">
                      <div className="flex items-center justify-between mb-6">
                          <div className="flex items-center gap-4">
                              <div className="w-12 h-12 bg-rose-50 dark:bg-rose-900/20 rounded-2xl flex items-center justify-center font-bold text-rose-600 dark:text-rose-400 text-lg shadow-inner">{rev.userName[0]}</div>
                              <div><h4 className="font-black text-gray-900 dark:text-gray-200">{rev.userName}</h4><p className="text-[10px] text-gray-400 uppercase font-black tracking-widest">{rev.date}</p></div>
                          </div>
                          <div className="flex text-yellow-500 bg-yellow-50 dark:bg-yellow-900/10 px-3 py-1 rounded-full text-xs">{[...Array(rev.rating)].map((_, i) => <span key={i}>★</span>)}</div>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 italic leading-loose text-lg">"{rev.comment}"</p>
                  </div>
                ))}
             </div>
          </div>
        )}
        {activeTab === 'history' && <PageHistory history={orderHistory} />}
        {activeTab === 'admin_dashboard' && <AdminOrderPanel orders={adminOrderHistory} onUpdateStatus={updateOrderStatus} />}
        {activeTab === 'contact' && (
           <div className="py-20 text-center animate-in fade-in duration-500 px-6">
             <div className="w-20 h-20 bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 rounded-[32px] flex items-center justify-center text-4xl mx-auto mb-6 shadow-inner">📍</div>
             <h2 className="text-4xl font-black mb-4 dark:text-white">Visit Our Hotel</h2>
             <p className="text-gray-500 dark:text-gray-400 text-lg mb-2">Near Doshi Vakil College, Goregaon-Lonere Road, Goregaon-Raigad (402103) </p>
             <a href={MAPS_LINK} target="_blank" rel="noopener noreferrer" className="text-rose-600 dark:text-rose-400 font-bold text-sm underline mb-4 block">View on Google Maps</a>
             <p className="font-black text-2xl mt-4 text-rose-600 dark:text-rose-400">+91 {WHATSAPP_NUMBER}</p>
             <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center items-center">
                <a href={`https://wa.me/91${WHATSAPP_NUMBER}`} className="w-full sm:w-auto bg-green-500 text-white px-8 py-4 rounded-2xl font-black shadow-xl shadow-green-100 dark:shadow-green-900/20 tap-scale flex items-center justify-center gap-3">WhatsApp Chat</a>
             </div>
           </div>
        )}
      </main>

      {isAdminLoginOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
           <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => setIsAdminLoginOpen(false)}></div>
           <div className="relative bg-white dark:bg-[#1A1A1A] w-full max-w-sm rounded-[50px] overflow-hidden shadow-2xl animate-scale-in">
              <div className="p-10 text-center">
                 <h2 className="text-2xl font-black mb-2 dark:text-white">Admin Access</h2>
                 <form onSubmit={handleAdminLogin} className="space-y-4 text-left">
                    <input type="text" placeholder="Username" className="w-full bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 rounded-2xl px-6 py-4 text-sm font-bold focus:ring-2 focus:ring-rose-500 outline-none shadow-inner dark:text-white" value={adminCreds.username} onChange={e => setAdminCreds({...adminCreds, username: e.target.value})} />
                    <input type="password" placeholder="Password" className="w-full bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 rounded-2xl px-6 py-4 text-sm font-bold focus:ring-2 focus:ring-rose-500 outline-none shadow-inner dark:text-white" value={adminCreds.password} onChange={e => setAdminCreds({...adminCreds, password: e.target.value})} />
                    {loginError && <p className="text-red-500 text-[10px] font-black uppercase text-center mt-2">{loginError}</p>}
                    <button type="submit" className="w-full py-5 bg-rose-600 text-white rounded-[24px] font-black text-sm shadow-xl shadow-rose-200 dark:shadow-rose-900/30 tap-scale mt-4">Login</button>
                 </form>
              </div>
           </div>
        </div>
      )}

      {isCheckoutOpen && (
        <div className="fixed inset-0 z-[110] flex items-end">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => setIsCheckoutOpen(false)}></div>
          <div className="relative bg-white dark:bg-[#121212] w-full max-w-2xl mx-auto rounded-t-[50px] animate-slide-up overflow-hidden shadow-2xl flex flex-col h-[92vh]">
             <div className="p-10 flex justify-between items-center border-b border-gray-50 dark:border-gray-800">
               <h2 className="text-3xl font-black tracking-tight dark:text-white">Finalize Order</h2>
               <button onClick={() => setIsCheckoutOpen(false)} className="w-10 h-10 rounded-full bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-gray-400 font-bold tap-scale">✕</button>
             </div>
             <div className="flex-1 overflow-y-auto p-10 space-y-8 no-scrollbar bg-[#FAFAFA] dark:bg-[#121212]">
                <div className="space-y-4">
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Personal Info</h3>
                  <div className="grid grid-cols-1 gap-4">
                    <input type="text" placeholder="Full Name" className="w-full bg-white dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 rounded-2xl px-6 py-5 text-sm font-bold focus:ring-2 focus:ring-rose-500 outline-none shadow-sm dark:text-white" value={userData.name} onChange={e => setUserData({...userData, name: e.target.value})} />
                    <input type="tel" placeholder="Mobile Number" className="w-full bg-white dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 rounded-2xl px-6 py-5 text-sm font-bold focus:ring-2 focus:ring-rose-500 outline-none shadow-sm dark:text-white" value={userData.phone} onChange={e => setUserData({...userData, phone: e.target.value})} />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Delivery Location</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {DELIVERY_ZONES.map(zone => (
                      <button key={zone.name} onClick={() => setUserData({...userData, area: zone.name})} className={`p-2.5 rounded-2xl border-2 text-left transition-all tap-scale ${userData.area === zone.name ? 'border-rose-600 bg-rose-50 dark:bg-rose-900/10' : 'border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-800/30'}`}>
                        <p className={`text-[10px] font-black leading-tight truncate ${userData.area === zone.name ? 'text-rose-600 dark:text-rose-400' : 'text-gray-900 dark:text-gray-200'}`}>{zone.name}</p>
                        <p className="text-[8px] text-gray-400 font-bold mt-1">Fee: ₹{zone.fee}</p>
                      </button>
                    ))}
                  </div>
                  <textarea placeholder="Detailed Address" className="w-full bg-white dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 rounded-2xl px-6 py-5 text-sm font-bold focus:ring-2 focus:ring-rose-500 outline-none h-24 resize-none shadow-sm mt-2 dark:text-white" value={userData.address} onChange={e => setUserData({...userData, address: e.target.value})} />
                </div>

                <div className="space-y-4">
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Payment Mode</h3>
                  <div className="grid grid-cols-2 gap-4">
                     <button onClick={() => setPaymentMethod('COD')} className={`p-6 rounded-[30px] border-2 flex flex-col items-start gap-1 transition-all tap-scale ${paymentMethod === 'COD' ? 'border-rose-600 bg-rose-50 dark:bg-rose-900/10 shadow-inner' : 'border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-800/30 shadow-sm'}`}>
                        <div className="flex items-center gap-3">
                           <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'COD' ? 'border-rose-600 dark:border-rose-400' : 'border-gray-300 dark:border-gray-600'}`}>{paymentMethod === 'COD' && <div className="w-2 h-2 bg-rose-600 dark:bg-rose-400 rounded-full"></div>}</div>
                           <span className="font-black text-gray-900 dark:text-white">COD</span>
                        </div>
                        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Pay on Delivery</span>
                     </button>
                     <button onClick={() => setPaymentMethod('Online')} className={`p-6 rounded-[30px] border-2 flex flex-col items-start gap-1 transition-all tap-scale ${paymentMethod === 'Online' ? 'border-rose-600 bg-rose-50 dark:bg-rose-900/10 shadow-inner' : 'border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-800/30 shadow-sm'}`}>
                        <div className="flex items-center gap-3">
                           <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'Online' ? 'border-rose-600 dark:border-rose-400' : 'border-gray-300 dark:border-gray-600'}`}>{paymentMethod === 'Online' && <div className="w-2 h-2 bg-rose-600 dark:bg-rose-400 rounded-full"></div>}</div>
                           <span className="font-black text-gray-900 dark:text-white">Online</span>
                        </div>
                        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Scan UPI QR Code</span>
                     </button>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Items In Your Bag</h3>
                  <div className="space-y-4 pb-6">
                    {cart.map(item => (
                      <div key={`${item.id}-${item.selectedVariation.type}`} className="flex justify-between items-center bg-white dark:bg-[#1A1A1A] p-5 rounded-[32px] shadow-sm border border-gray-100 dark:border-gray-800">
                         <div className="flex items-center gap-4">
                           <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-inner bg-gray-100 dark:bg-gray-800">
                              <img src={item.image} className="w-full h-full object-cover" alt="" />
                           </div>
                           <div>
                             <p className="font-black text-sm text-gray-900 dark:text-white">{item.name}</p>
                             <p className="text-[10px] text-rose-500 dark:text-rose-400 uppercase font-black tracking-widest mt-0.5">{item.selectedVariation.type}</p>
                           </div>
                         </div>
                         <div className="flex flex-col items-end gap-3">
                            <div className="flex items-center gap-3 bg-rose-50 dark:bg-rose-900/20 p-1 rounded-full border border-rose-100 dark:border-rose-900/40">
                               <button onClick={() => updateQuantity(item.id, item.selectedVariation.type, -1)} className="w-8 h-8 rounded-full bg-white dark:bg-gray-700 text-rose-600 dark:text-rose-400 font-black shadow-sm flex items-center justify-center tap-scale">-</button>
                               <span className="font-black text-xs text-rose-600 dark:text-rose-400 px-1 w-4 text-center">{item.quantity}</span>
                               <button onClick={() => updateQuantity(item.id, item.selectedVariation.type, 1)} className="w-8 h-8 rounded-full bg-rose-600 dark:bg-rose-500 text-white font-black shadow-md flex items-center justify-center tap-scale">+</button>
                            </div>
                            <p className="font-black text-gray-900 dark:text-white">₹{item.selectedVariation.price * item.quantity}</p>
                         </div>
                      </div>
                    ))}
                  </div>
                </div>
             </div>
             <div className="p-8 border-t border-gray-50 dark:border-gray-800 bg-white dark:bg-[#121212] shadow-[0_-10px_40px_rgba(0,0,0,0.02)]">
                <div className="space-y-1 mb-6">
                  <div className="flex justify-between items-center text-gray-400 text-[9px] font-black uppercase tracking-widest"><span>Item Total</span><span>₹{subtotal}</span></div>
                  <div className="flex justify-between items-center text-gray-400 text-[9px] font-black uppercase tracking-widest"><span>Delivery Fee</span><span>₹{deliveryCharge}</span></div>
                  <div className="h-px bg-gray-50 dark:bg-gray-800 my-1.5"></div>
                  <div className="flex justify-between items-center">
                    <div className="flex flex-col"><span className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Grand Total</span><span className="text-3xl font-black text-gray-900 dark:text-white">₹{cartTotal}</span></div>
                    <span className="text-[8px] font-black uppercase tracking-widest text-rose-500 dark:text-rose-400 bg-rose-50 dark:bg-rose-900/20 px-3 py-1.5 rounded-full border border-rose-100 dark:border-rose-900/40">{userData.area}</span>
                  </div>
                </div>
                {subtotal < (currentDeliveryZone.minOrder || MIN_ORDER_VALUE) && (
                  <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/40 rounded-xl text-center">
                    <p className="text-[10px] font-black text-red-600 dark:text-red-400 uppercase tracking-widest">
                      Min. order for {userData.area} is ₹{currentDeliveryZone.minOrder || MIN_ORDER_VALUE}
                    </p>
                    <p className="text-[9px] text-red-500 mt-1">Please add ₹{(currentDeliveryZone.minOrder || MIN_ORDER_VALUE) - subtotal} more items to proceed.</p>
                  </div>
                )}
                <button onClick={handleConfirmOrder} disabled={!userData.name || !userData.address || !userData.phone || !userData.area || cart.length === 0 || subtotal < (currentDeliveryZone.minOrder || MIN_ORDER_VALUE)} className="w-full py-5 bg-rose-600 text-white rounded-[24px] font-black text-lg shadow-2xl shadow-rose-200 dark:shadow-rose-900/30 tap-scale disabled:bg-gray-100 dark:disabled:bg-gray-800 disabled:text-gray-300 transition-all active:scale-95">
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
                   <MaherLogo className="w-16 h-16 shadow-xl" />
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

      <nav className="fixed bottom-6 left-6 right-6 z-[70] glass-top rounded-[32px] p-2 flex justify-between items-center shadow-2xl border border-white/50 dark:border-white/5">
        {[ { id: 'home', icon: '🏠', label: 'Home' }, { id: 'menu', icon: '📖', label: 'Menu' }, { id: 'reviews', icon: '⭐', label: 'Love' }, { id: 'history', icon: '🥡', label: 'Orders' }, { id: 'contact', icon: '📞', label: 'Contact' }].map(item => (
          <button key={item.id} onClick={() => setActiveTab(item.id as any)} className={`flex flex-col items-center gap-1.5 p-3 flex-1 rounded-[24px] transition-all tap-scale ${activeTab === item.id ? 'bg-rose-600 text-white shadow-xl shadow-rose-900/20' : 'text-gray-400'}`}>
            <span className="text-xl">{item.icon}</span><span className="text-[9px] font-black uppercase tracking-widest">{item.label}</span>
          </button>
        ))}
      </nav>

      {isDetailOpen && selectedDish && (
        <div className="fixed inset-0 z-[100] flex items-end">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-md" onClick={() => setIsDetailOpen(false)}></div>
            <div className="relative bg-white dark:bg-[#1A1A1A] w-full rounded-t-[50px] animate-slide-up max-w-xl mx-auto overflow-hidden shadow-2xl">
                <div className="h-80 relative">
                    <img src={selectedDish.image} className="w-full h-full object-cover" alt="" />
                    <button onClick={() => setIsDetailOpen(false)} className="absolute top-8 right-8 w-12 h-12 bg-white/90 dark:bg-black/60 backdrop-blur-md rounded-full flex items-center justify-center text-rose-600 dark:text-rose-400 shadow-xl font-bold tap-scale z-20">✕</button>
                </div>
                <div className="p-10 relative z-10 bg-white dark:bg-[#1A1A1A] rounded-t-[40px] -mt-8">
                    <h2 className="text-3xl font-black tracking-tight text-gray-900 dark:text-white">{selectedDish.name}</h2>
                    <p className="text-gray-500 dark:text-gray-400 mb-8 text-lg leading-relaxed">{selectedDish.description}</p>
                    <div className="space-y-6">
                        <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest ml-1">Select Portion</p>
                        <div className="flex gap-5">
                            {selectedDish.variations.map((v, idx) => (
                                <button key={idx} onClick={() => setSelectedVarIndex(idx)} className={`flex-1 p-6 rounded-[30px] border-2 transition-all tap-scale ${selectedVarIndex === idx ? 'border-rose-600 bg-rose-50 dark:bg-rose-900/10 shadow-inner' : 'border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/30'}`}>
                                    <span className={`text-[10px] font-black uppercase tracking-[0.1em] mb-1 block ${selectedVarIndex === idx ? 'text-rose-600 dark:text-rose-400' : 'text-gray-400 dark:text-gray-500'}`}>{v.type}</span>
                                    <span className="font-black text-xl text-gray-900 dark:text-white">₹{v.price}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="mt-10 mb-12 flex items-center justify-between">
                       <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest ml-1">Set Quantity</p>
                       <div className="flex items-center gap-6 bg-gray-50 dark:bg-gray-800/50 p-2 rounded-3xl border border-gray-100 dark:border-gray-800">
                          <button onClick={() => setDetailQuantity(q => Math.max(1, q - 1))} className="w-12 h-12 rounded-2xl bg-white dark:bg-gray-700 text-rose-600 dark:text-rose-400 font-black shadow-sm flex items-center justify-center tap-scale">-</button>
                          <span className="font-black text-2xl text-gray-900 dark:text-white min-w-[2ch] text-center">{detailQuantity}</span>
                          <button onClick={() => setDetailQuantity(q => q + 1)} className="w-12 h-12 rounded-2xl bg-rose-600 dark:bg-rose-500 text-white font-black shadow-xl flex items-center justify-center tap-scale">+</button>
                       </div>
                    </div>
                    <button onClick={() => addToCart(selectedDish, selectedDish.variations[selectedVarIndex], detailQuantity)} className="w-full py-6 bg-rose-600 text-white rounded-[30px] font-black text-xl shadow-2xl shadow-rose-200 dark:shadow-rose-900/30 tap-scale flex items-center justify-center gap-4">
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
           <div className="absolute left-0 top-0 bottom-0 w-[300px] bg-white dark:bg-[#121212] animate-in slide-in-from-left duration-500 shadow-2xl flex flex-col rounded-r-[40px] border-r border-gray-100 dark:border-gray-800">
              <div className="p-10 border-b border-gray-50 dark:border-gray-800 bg-rose-50/20 dark:bg-rose-900/5 flex flex-col items-center">
                 <MaherLogo className="w-20 h-20 mb-4 shadow-xl" />
                 <h2 className="font-black text-2xl text-rose-600 dark:text-rose-400 tracking-tighter">Maher</h2>
                 <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mt-1">Premium Indo-Chinese</p>
              </div>
              <div className="flex-1 p-6 space-y-3 pt-8 overflow-y-auto no-scrollbar">
                 {[{ id: 'home', label: 'Home' }, { id: 'menu', label: 'Full Menu' }, { id: 'favorites', label: 'Your Favorites' }, { id: 'reviews', label: 'Guest Reviews' }, { id: 'history', label: 'Order History' }, { id: 'contact', label: 'Find Us' }].map(item => (
                   <button key={item.id} onClick={() => { setActiveTab(item.id as any); setIsSideMenuOpen(false); }} className={`w-full text-left p-5 rounded-[24px] font-black text-sm uppercase tracking-widest tap-scale transition-all ${activeTab === item.id ? 'bg-rose-600 text-white shadow-xl shadow-rose-200 dark:shadow-rose-900/30' : 'text-gray-600 dark:text-gray-400 hover:bg-rose-50 dark:hover:bg-gray-800'}`}>{item.label}</button>
                 ))}
                 {isAdminMode && <button onClick={() => { setActiveTab('admin_dashboard'); setIsSideMenuOpen(false); }} className={`w-full text-left p-5 rounded-[24px] font-black text-sm uppercase tracking-widest tap-scale transition-all border-2 mt-4 ${activeTab === 'admin_dashboard' ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 border-gray-900 dark:border-white shadow-xl' : 'text-gray-900 dark:text-white border-gray-900 dark:border-gray-700'}`}>Admin Dashboard</button>}
                 <button onClick={() => { if (isAdminMode) { setIsAdminMode(false); setIsSideMenuOpen(false); if (activeTab === 'admin_dashboard') setActiveTab('home'); } else { setIsAdminLoginOpen(true); } }} className={`w-full text-left p-5 rounded-[24px] font-black text-sm uppercase tracking-widest tap-scale transition-all mt-10 flex items-center justify-between ${isAdminMode ? 'bg-green-500 text-white shadow-xl shadow-green-200' : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700'}`}>
                   <span>{isAdminMode ? 'Exit Admin Mode' : 'Admin Access'}</span><span className="text-lg">{isAdminMode ? '🔓' : '🔒'}</span>
                 </button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default App;
