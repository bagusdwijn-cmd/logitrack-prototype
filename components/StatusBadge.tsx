
import React from 'react';
import { OrderStatus } from '../types';

interface StatusBadgeProps {
  status: OrderStatus;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const configs: Record<OrderStatus, { color: string; label: string }> = {
    [OrderStatus.ORDER_BARU]: { color: 'bg-blue-100 text-blue-700', label: 'Order Baru' },
    [OrderStatus.READY]: { color: 'bg-emerald-100 text-emerald-700', label: 'Siap' },
    [OrderStatus.SIAP_DIKIRIM]: { color: 'bg-amber-100 text-amber-700', label: 'Diproses' },
    [OrderStatus.DALAM_PENGIRIMAN]: { color: 'bg-indigo-100 text-indigo-700', label: 'Pengiriman' },
    [OrderStatus.SELESAI]: { color: 'bg-slate-100 text-slate-700', label: 'Selesai' },
  };

  const config = configs[status];

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wide ${config.color}`}>
      {config.label}
    </span>
  );
};

export default StatusBadge;
