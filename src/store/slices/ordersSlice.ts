import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem } from './cartSlice';

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  customerInfo: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  paymentMethod: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  createdAt: string;
}

interface OrdersState {
  orders: Order[];
  lastOrder: Order | null;
}

const loadOrdersFromStorage = (): Order[] => {
  try {
    const savedOrders = localStorage.getItem('orders');
    return savedOrders ? JSON.parse(savedOrders) : [];
  } catch {
    return [];
  }
};

const saveOrdersToStorage = (orders: Order[]) => {
  localStorage.setItem('orders', JSON.stringify(orders));
};

const initialState: OrdersState = {
  orders: loadOrdersFromStorage(),
  lastOrder: null,
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    createOrder: (state, action: PayloadAction<Omit<Order, 'id' | 'createdAt' | 'status'>>) => {
      const newOrder: Order = {
        ...action.payload,
        id: `ORD-${Date.now()}`,
        status: 'pending',
        createdAt: new Date().toISOString(),
      };
      state.orders.unshift(newOrder);
      state.lastOrder = newOrder;
      saveOrdersToStorage(state.orders);
    },
    updateOrderStatus: (state, action: PayloadAction<{ id: string; status: Order['status'] }>) => {
      const order = state.orders.find(o => o.id === action.payload.id);
      if (order) {
        order.status = action.payload.status;
        saveOrdersToStorage(state.orders);
      }
    },
  },
});

export const { createOrder, updateOrderStatus } = ordersSlice.actions;

export default ordersSlice.reducer;
