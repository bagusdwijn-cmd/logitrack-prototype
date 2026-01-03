
export enum OrderStatus {
  ORDER_BARU = 'ORDER_BARU',
  READY = 'READY',
  SIAP_DIKIRIM = 'SIAP_DIKIRIM',
  DALAM_PENGIRIMAN = 'DALAM_PENGIRIMAN',
  SELESAI = 'SELESAI'
}

export enum UserRole {
  ADMIN = 'ADMIN',
  WAREHOUSE = 'WAREHOUSE',
  COURIER = 'COURIER'
}

export interface Customer {
  id: string;
  name: string;
  address: string;
  phone: string;
  lat: number;
  lng: number;
}

export interface Product {
  id: string;
  name: string;
  unit: 'kg' | 'pcs' | 'box';
}

export interface OrderItem {
  id: string;
  productName: string;
  qtyOrdered: number;
  qtyActual?: number;
  pricePerUnit?: number;
  productPhoto?: string;
  scalePhoto?: string;
}

export interface Order {
  id: string;
  orderCode: string;
  orderDate: string;
  customerId: string;
  status: OrderStatus;
  items: OrderItem[];
  totalAmount?: number;
  courierId?: string;
  vehicle?: string;
  deliveryDate?: string;
  currentLat?: number;
  currentLng?: number;
  paymentMethod?: 'CASH' | 'TRANSFER';
  paymentAmount?: number;
  paymentProof?: string;
  deliveryProof?: string;
  recipientPhoto?: string;
}

export interface Activity {
  id: string;
  timestamp: string;
  message: string;
  type: 'info' | 'success' | 'warning';
}
