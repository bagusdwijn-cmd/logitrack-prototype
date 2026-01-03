
import { Customer, Product } from './types';

export const MOCK_CUSTOMERS: Customer[] = [
  {
    id: 'c1',
    name: 'Resto Berkah Abadi',
    address: 'Jl. Melati No. 45, Jakarta Selatan',
    phone: '081234567890',
    lat: -6.2297,
    lng: 106.8295
  },
  {
    id: 'c2',
    name: 'Warung Pojok Sedap',
    address: 'Kuningan City Mall, Lt. 2',
    phone: '081298765432',
    lat: -6.2248,
    lng: 106.8267
  },
  {
    id: 'c3',
    name: 'Hotel Grand Luxury',
    address: 'Jl. Sudirman No. 1, Jakarta Pusat',
    phone: '08111222333',
    lat: -6.2146,
    lng: 106.8213
  }
];

export const MOCK_PRODUCTS: Product[] = [
  { id: 'p1', name: 'Ayam Potong Broiler', unit: 'kg' },
  { id: 'p2', name: 'Telur Ayam Negeri', unit: 'kg' },
  { id: 'p3', name: 'Daging Sapi Sirloin', unit: 'kg' },
  { id: 'p4', name: 'Sayur Bayam Fresh', unit: 'box' },
  { id: 'p5', name: 'Minyak Goreng 2L', unit: 'pcs' }
];

export const MOCK_COURIERS = [
  { id: 'k1', name: 'Budi Santoso', vehicle: 'Motor - B 1234 ABC' },
  { id: 'k2', name: 'Andi Wijaya', vehicle: 'Box Van - B 5678 DEF' },
  { id: 'k3', name: 'Candra Pratama', vehicle: 'Motor - B 9012 GHI' }
];
