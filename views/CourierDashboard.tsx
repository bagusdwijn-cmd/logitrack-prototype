
import React, { useContext, useState } from 'react';
import { AppContext } from '../App';
import { OrderStatus, Order } from '../types';
import { MOCK_CUSTOMERS } from '../mockData';
import MapView from '../components/MapView';
import { Truck, MapPin, QrCode, Camera, CreditCard, CheckCircle, Navigation, ChevronRight } from 'lucide-react';

const CourierDashboard: React.FC = () => {
  const context = useContext(AppContext);
  if (!context) return null;
  const { orders, setOrders, addActivity } = context;
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);
  const [step, setStep] = useState(1);

  const assigned = orders.filter(o => o.status === OrderStatus.SIAP_DIKIRIM || o.status === OrderStatus.DALAM_PENGIRIMAN);

  const updateStatus = (status: OrderStatus, nextStep: number) => {
    if (!activeOrder) return;
    const updated = { ...activeOrder, status, currentLat: activeOrder.currentLat || -6.21, currentLng: activeOrder.currentLng || 106.85 };
    setOrders(orders.map(o => o.id === activeOrder.id ? updated : o));
    setActiveOrder(updated);
    setStep(nextStep);
    if (status === OrderStatus.SELESAI) { setActiveOrder(null); addActivity('Delivery done', 'success'); }
  };

  if (activeOrder) return (
    <div className="p-4 space-y-4 max-w-md mx-auto">
      <button onClick={() => setActiveOrder(null)} className="text-slate-500 font-bold">Back</button>
      <MapView customerLat={MOCK_CUSTOMERS.find(c => c.id === activeOrder.customerId)?.lat || 0} customerLng={MOCK_CUSTOMERS.find(c => c.id === activeOrder.customerId)?.lng || 0} courierLat={activeOrder.currentLat} courierLng={activeOrder.currentLng} isLive />
      <div className="bg-white p-5 rounded-2xl shadow-xl border border-slate-100 space-y-6">
        <h3 className="text-lg font-bold">{activeOrder.orderCode} - {MOCK_CUSTOMERS.find(c => c.id === activeOrder.customerId)?.name}</h3>
        {step === 1 && <button onClick={() => updateStatus(OrderStatus.DALAM_PENGIRIMAN, 2)} className="w-full bg-indigo-600 text-white font-bold py-3 rounded-xl">Mulai Pengiriman</button>}
        {step === 2 && <button onClick={() => setStep(3)} className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2"><QrCode className="w-5 h-5" />Simulasi Scan QR</button>}
        {step === 3 && <button onClick={() => setStep(4)} className="w-full bg-emerald-600 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2"><Camera className="w-5 h-5" />Ambil Bukti Foto</button>}
        {step === 4 && <button onClick={() => setStep(5)} className="w-full bg-amber-600 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2"><CreditCard className="w-5 h-5" />Rekam Pembayaran</button>}
        {step === 5 && <button onClick={() => updateStatus(OrderStatus.SELESAI, 1)} className="w-full bg-indigo-600 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2"><CheckCircle className="w-5 h-5" />Selesaikan</button>}
      </div>
    </div>
  );

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Tugas Pengiriman</h2>
      {assigned.map(order => (
        <div key={order.id} onClick={() => setActiveOrder(order)} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between cursor-pointer">
          <div className="flex items-center gap-4">
            <div className={`p-2 rounded-lg ${order.status === OrderStatus.DALAM_PENGIRIMAN ? 'bg-indigo-600 text-white' : 'bg-slate-50 text-slate-400'}`}><Navigation className="w-5 h-5" /></div>
            <div><p className="text-xs font-bold text-indigo-600">{order.orderCode}</p><h3 className="font-bold text-slate-800">{MOCK_CUSTOMERS.find(c => c.id === order.customerId)?.name}</h3></div>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-300" />
        </div>
      ))}
    </div>
  );
};

export default CourierDashboard;
