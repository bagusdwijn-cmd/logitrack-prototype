
import React, { useContext, useState } from 'react';
import { AppContext } from '../App';
import { OrderStatus, Order, OrderItem } from '../types';
import { MOCK_CUSTOMERS, MOCK_PRODUCTS, MOCK_COURIERS } from '../mockData';
import StatusBadge from '../components/StatusBadge';
import MapView from '../components/MapView';
import { 
  Plus, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  ChevronRight,
  FileText,
  UserCheck,
  Truck,
  ClipboardList,
  Package,
  Bell
} from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const context = useContext(AppContext);
  if (!context) return null;
  const { orders, setOrders, activities, addActivity } = context;
  const [view, setView] = useState<'LIST' | 'CREATE' | 'DETAIL'>('LIST');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const stats = {
    waiting: orders.filter(o => o.status === OrderStatus.ORDER_BARU).length,
    ready: orders.filter(o => o.status === OrderStatus.READY).length,
    shipping: orders.filter(o => o.status === OrderStatus.DALAM_PENGIRIMAN).length,
    done: orders.filter(o => o.status === OrderStatus.SELESAI).length,
  };

  const handleCreateOrder = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const customerId = (new FormData(e.currentTarget)).get('customer') as string;
    const newOrder: Order = {
      id: Math.random().toString(36).substr(2, 9),
      orderCode: `ORD-2024-${String(orders.length + 1).padStart(3, '0')}`,
      orderDate: new Date().toISOString().split('T')[0],
      customerId,
      status: OrderStatus.ORDER_BARU,
      items: [{ id: '1', productName: MOCK_PRODUCTS[0].name, qtyOrdered: 10 }]
    };
    setOrders([newOrder, ...orders]);
    addActivity(`New order ${newOrder.orderCode} created`, 'success');
    setView('LIST');
  };

  const assignCourier = (order: Order, courierId: string) => {
    const courier = MOCK_COURIERS.find(c => c.id === courierId);
    const updatedOrder = { ...order, courierId, vehicle: courier?.vehicle, deliveryDate: new Date().toISOString().split('T')[0] };
    setOrders(orders.map(o => o.id === order.id ? updatedOrder : o));
    setSelectedOrder(updatedOrder);
    addActivity(`Courier ${courier?.name} assigned`, 'success');
  };

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Antri', val: stats.waiting, icon: Clock, color: 'blue' },
          { label: 'Siap', val: stats.ready, icon: CheckCircle2, color: 'emerald' },
          { label: 'Kirim', val: stats.shipping, icon: Truck, color: 'indigo' },
          { label: 'Selesai', val: stats.done, icon: AlertCircle, color: 'slate' }
        ].map(s => (
          <div key={s.label} className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
            <div className="flex items-center gap-2 mb-2">
              <div className={`p-1.5 bg-${s.color}-50 text-${s.color}-600 rounded-lg`}><s.icon className="w-4 h-4" /></div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{s.label}</span>
            </div>
            <p className="text-2xl font-bold text-slate-800">{s.val}</p>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2"><ClipboardList className="w-5 h-5 text-indigo-600" />{view === 'LIST' ? 'Monitoring' : 'Order Detail'}</h2>
            {view === 'LIST' && <button onClick={() => setView('CREATE')} className="bg-indigo-600 text-white px-3 py-1.5 rounded-lg text-sm font-semibold flex items-center gap-1"><Plus className="w-4 h-4" />Tambah</button>}
            {view !== 'LIST' && <button onClick={() => setView('LIST')} className="text-slate-500 text-sm font-medium">Kembali</button>}
          </div>
          {view === 'LIST' && orders.map(order => (
            <div key={order.id} onClick={() => { setSelectedOrder(order); setView('DETAIL'); }} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm hover:border-indigo-300 transition-all cursor-pointer group flex justify-between items-center">
              <div>
                <p className="text-xs font-bold text-indigo-600 tracking-wider">{order.orderCode}</p>
                <h3 className="font-bold text-slate-800">{MOCK_CUSTOMERS.find(c => c.id === order.customerId)?.name}</h3>
              </div>
              <StatusBadge status={order.status} />
            </div>
          ))}
          {view === 'CREATE' && (
            <form onSubmit={handleCreateOrder} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-4">
              <label className="block text-xs font-bold text-slate-500 uppercase">Customer</label>
              <select name="customer" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2">
                {MOCK_CUSTOMERS.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
              <button type="submit" className="w-full bg-indigo-600 text-white font-bold py-3 rounded-xl">Simpan Order</button>
            </form>
          )}
          {view === 'DETAIL' && selectedOrder && (
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-6">
              <h3 className="text-xl font-bold">{selectedOrder.orderCode} - <StatusBadge status={selectedOrder.status} /></h3>
              {selectedOrder.status === OrderStatus.SIAP_DIKIRIM && (
                <div className="space-y-3">
                  <h4 className="text-sm font-bold flex items-center gap-2"><UserCheck className="w-4 h-4" />Assign Kurir</h4>
                  {MOCK_COURIERS.map(c => (
                    <button key={c.id} onClick={() => assignCourier(selectedOrder, c.id)} className="w-full flex items-center justify-between p-3 bg-slate-50 rounded-lg text-left">
                      <div><p className="text-sm font-bold">{c.name}</p><p className="text-[10px] text-slate-500 uppercase">{c.vehicle}</p></div>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  ))}
                </div>
              )}
              {selectedOrder.status === OrderStatus.DALAM_PENGIRIMAN && (
                <MapView customerLat={MOCK_CUSTOMERS.find(c => c.id === selectedOrder.customerId)?.lat || 0} customerLng={MOCK_CUSTOMERS.find(c => c.id === selectedOrder.customerId)?.lng || 0} courierLat={selectedOrder.currentLat} courierLng={selectedOrder.currentLng} isLive />
              )}
            </div>
          )}
        </div>
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2"><Bell className="w-4 h-4" />Aktivitas</h2>
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 h-64 overflow-y-auto custom-scrollbar">
            {activities.map(act => (
              <div key={act.id} className="pb-3 mb-3 border-b border-slate-50 last:border-0 last:mb-0">
                <p className="text-xs font-bold text-slate-700 leading-tight">{act.message}</p>
                <p className="text-[10px] text-slate-400 font-medium">{act.timestamp}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
