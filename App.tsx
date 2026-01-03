
import React, { useState, useEffect, createContext } from 'react';
import { UserRole, Order, OrderStatus, Activity } from './types';
import { MOCK_CUSTOMERS } from './mockData';
import Login from './views/Login';
import AdminDashboard from './views/AdminDashboard';
import WarehouseDashboard from './views/WarehouseDashboard';
import CourierDashboard from './views/CourierDashboard';
import { 
  ClipboardList, 
  LayoutDashboard, 
  Truck, 
  LogOut, 
  Bell
} from 'lucide-react';

interface AppContextType {
  role: UserRole | null;
  setRole: (role: UserRole | null) => void;
  orders: Order[];
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
  activities: Activity[];
  addActivity: (message: string, type?: 'info' | 'success' | 'warning') => void;
}

export const AppContext = createContext<AppContextType | null>(null);

const App: React.FC = () => {
  const [role, setRole] = useState<UserRole | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);

  const addActivity = (message: string, type: 'info' | 'success' | 'warning' = 'info') => {
    const newActivity: Activity = {
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toLocaleTimeString(),
      message,
      type
    };
    setActivities(prev => [newActivity, ...prev].slice(0, 10));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setOrders(currentOrders => 
        currentOrders.map(order => {
          if (order.status === OrderStatus.DALAM_PENGIRIMAN && order.currentLat && order.currentLng) {
            const customer = MOCK_CUSTOMERS.find(c => c.id === order.customerId);
            if (!customer) return order;
            
            const dLat = (customer.lat - order.currentLat) * 0.1;
            const dLng = (customer.lng - order.currentLng) * 0.1;
            
            return {
              ...order,
              currentLat: order.currentLat + dLat,
              currentLng: order.currentLng + dLng
            };
          }
          return order;
        })
      );
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const renderContent = () => {
    switch (role) {
      case UserRole.ADMIN: return <AdminDashboard />;
      case UserRole.WAREHOUSE: return <WarehouseDashboard />;
      case UserRole.COURIER: return <CourierDashboard />;
      default: return <Login />;
    }
  };

  return (
    <AppContext.Provider value={{ role, setRole, orders, setOrders, activities, addActivity }}>
      <div className="min-h-screen flex flex-col max-w-5xl mx-auto bg-white shadow-xl relative">
        {role && (
          <header className="bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between sticky top-0 z-50">
            <div className="flex items-center gap-2">
              <div className="bg-indigo-600 p-1.5 rounded-lg">
                <Truck className="w-5 h-5 text-white" />
              </div>
              <h1 className="font-bold text-lg tracking-tight text-slate-800">LogiTrack</h1>
            </div>
            
            <div className="flex items-center gap-4">
              <span className="hidden sm:inline-block px-2.5 py-1 rounded-full bg-slate-100 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                {role} MODE
              </span>
              <button 
                onClick={() => setRole(null)}
                className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </header>
        )}

        <main className="flex-1 overflow-y-auto custom-scrollbar">
          {renderContent()}
        </main>

        {role && (
          <nav className="sm:hidden bg-white border-t border-slate-200 grid grid-cols-3 py-2 sticky bottom-0 z-50">
            <button className="flex flex-col items-center gap-1 text-indigo-600">
              <LayoutDashboard className="w-6 h-6" />
              <span className="text-[10px] font-medium">Dashboard</span>
            </button>
            <button className="flex flex-col items-center gap-1 text-slate-400">
              <ClipboardList className="w-6 h-6" />
              <span className="text-[10px] font-medium">Orders</span>
            </button>
            <button className="flex flex-col items-center gap-1 text-slate-400">
              <Bell className="w-6 h-6" />
              <span className="text-[10px] font-medium">Alerts</span>
            </button>
          </nav>
        )}
      </div>
    </AppContext.Provider>
  );
};

export default App;
