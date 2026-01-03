
import React, { useContext } from 'react';
import { AppContext } from '../App';
import { UserRole } from '../types';
import { Truck, ShieldCheck, Warehouse, UserCircle } from 'lucide-react';

const Login: React.FC = () => {
  const context = useContext(AppContext);
  if (!context) return null;

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 bg-white">
      <div className="mb-10 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-600 text-white shadow-xl mb-4">
          <Truck className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">LogiTrack</h1>
        <p className="text-slate-500 mt-2 font-medium">Internal Distribution System</p>
      </div>
      <div className="w-full max-w-sm space-y-4">
        {[
          { role: UserRole.ADMIN, icon: ShieldCheck, title: 'Admin', desc: 'Manage orders & fleet', color: 'indigo' },
          { role: UserRole.WAREHOUSE, icon: Warehouse, title: 'Warehouse', desc: 'Order preparation', color: 'emerald' },
          { role: UserRole.COURIER, icon: UserCircle, title: 'Courier', desc: 'Delivery operations', color: 'blue' }
        ].map(item => (
          <button 
            key={item.role}
            onClick={() => { context.setRole(item.role); context.addActivity(`${item.role} logged in`); }}
            className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 border-slate-100 hover:border-${item.color}-600 hover:bg-${item.color}-50 transition-all group`}
          >
            <div className={`p-2 bg-${item.color}-100 rounded-lg text-${item.color}-600 group-hover:bg-${item.color}-600 group-hover:text-white transition-colors`}>
              <item.icon className="w-6 h-6" />
            </div>
            <div className="text-left">
              <p className="font-bold text-slate-800">{item.title}</p>
              <p className="text-xs text-slate-500">{item.desc}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Login;
