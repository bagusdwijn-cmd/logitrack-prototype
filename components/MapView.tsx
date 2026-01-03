
import React from 'react';
import { MapPin, Navigation } from 'lucide-react';

interface MapViewProps {
  courierLat?: number;
  courierLng?: number;
  customerLat: number;
  customerLng: number;
  isLive?: boolean;
}

const MapView: React.FC<MapViewProps> = ({ 
  courierLat, 
  courierLng, 
  customerLat, 
  customerLng,
  isLive = false
}) => {
  const bounds = { minLat: -6.25, maxLat: -6.15, minLng: 106.75, maxLng: 106.90 };
  const toPercent = (val: number, min: number, max: number) => ((val - min) / (max - min)) * 100;

  const custX = toPercent(customerLng, bounds.minLng, bounds.maxLng);
  const custY = 100 - toPercent(customerLat, bounds.minLat, bounds.maxLat);

  let courX = 0, courY = 0;
  if (courierLat && courierLng) {
    courX = toPercent(courierLng, bounds.minLng, bounds.maxLng);
    courY = 100 - toPercent(courierLat, bounds.minLat, bounds.maxLat);
  }

  return (
    <div className="relative w-full h-48 bg-slate-100 rounded-xl overflow-hidden border border-slate-200">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-10 left-0 w-full h-[1px] bg-slate-400"></div>
        <div className="absolute top-32 left-0 w-full h-[1px] bg-slate-400"></div>
        <div className="absolute top-0 left-20 w-[1px] h-full bg-slate-400"></div>
        <div className="absolute top-0 left-60 w-[1px] h-full bg-slate-400"></div>
      </div>
      <div 
        className="absolute transition-all duration-1000"
        style={{ left: `${custX}%`, top: `${custY}%`, transform: 'translate(-50%, -100%)' }}
      >
        <MapPin className="w-6 h-6 text-red-600 fill-red-200" />
      </div>
      {courierLat && (
        <div 
          className="absolute transition-all duration-1000 z-10"
          style={{ left: `${courX}%`, top: `${courY}%`, transform: 'translate(-50%, -50%)' }}
        >
          <div className="relative">
            <div className="bg-indigo-600 p-1.5 rounded-full shadow-lg border-2 border-white">
              <Navigation className="w-3 h-3 text-white fill-white" />
            </div>
            {isLive && <div className="absolute inset-0 bg-indigo-400 rounded-full status-pulse -z-10 scale-150 opacity-20"></div>}
          </div>
        </div>
      )}
    </div>
  );
};

export default MapView;
