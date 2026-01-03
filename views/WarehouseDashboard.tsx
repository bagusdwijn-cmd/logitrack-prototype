
import React, { useContext, useState } from 'react';
import { AppContext } from '../App';
import { OrderStatus, Order } from '../types';
import { MOCK_CUSTOMERS } from '../mockData';
import { Package, Camera, Scale, ChevronRight, CheckCircle } from 'lucide-react';

const WarehouseDashboard: React.FC = () => {
  const context = useContext(AppContext);
  if (!context) return null;
  const { orders, setOrders, addActivity } = context;
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);

  const handleFinish = () => {
    if (!activeOrder) return;
    const updated = { ...activeOrder, status: OrderStatus.READY, items: activeOrder.items.map(i => ({ ...i, qtyActual: i.qtyOrdered })) };
    setOrders(orders.map(o => o.id === activeOrder.id ? updated : o));
    addActivity(`Warehouse ready: ${activeOrder.orderCode}`, 'success');
    setActiveOrder(null);
  };

  if (activeOrder) return (
    <div className="p-6 space-y-6 max-w-2xl mx-auto">
      <button onClick={() => setActiveOrder(null)} className="text-slate-500 text-sm font-bold">Kembali</button>
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-4">
        <h2 className="text-xl font-bold">{activeOrder.orderCode}</h2>
        {activeOrder.items.map((item, idx) => (
          <div key={idx} className="p-4 bg-slate-50 rounded-xl space-y-3">
            <p className="font-bold">{item.productName} ({item.qtyOrdered} KG)</p>
            <div className="grid grid-cols-2 gap-3">
              <div className="h-20 bg-white border-2 border-dashed rounded-lg flex flex-col items-center justify-center text-slate-400 text-[10px]"><Camera className="w-4 h-4" />Foto Barang</div>
              <div className="h-20 bg-white border-2 border-dashed rounded-lg flex flex-col items-center justify-center text-slate-400 text-[10px]"><Scale className="w-4 h-4" />Foto Timbangan</div>
            </div>
          </div>
        ))}
        <button onClick={handleFinish} className="w-full bg-emerald-600 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2"><CheckCircle className="w-5 h-5" />Selesaikan Persiapan</button>
      </div>
    </div>
  );

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Antrian Gudang</h2>
      {orders.filter(o => o.status === OrderStatus.ORDER_BARU).map(order => (
        <div key={order.id} onClick={() => setActiveOrder(order)} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between cursor-pointer">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center"><Package className="w-6 h-6" /></div>
            <div><p className="text-xs font-bold text-emerald-600">{order.orderCode}</p><h3 className="font-bold text-slate-800">{MOCK_CUSTOMERS.find(c => c.id === order.customerId)?.name}</h3></div>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-300" />
        </div>
      ))}
    </div>
  );
};

export default WarehouseDashboard;
