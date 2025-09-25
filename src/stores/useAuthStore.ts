import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
  id: string;
  name: string;
  email: string;
  orders: Order[];
}

export interface Order {
  id: string;
  date: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  total: number;
  items: {
    id: string;
    name: string;
    price: number;
    quantity: number;
    size: string;
    image: string;
  }[];
}

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  addOrder: (order: Omit<Order, 'id' | 'date'>) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      
      login: async (email: string, password: string) => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock login logic - in a real app, this would validate against a backend
        if (email && password) {
          const user: User = {
            id: '1',
            name: 'Jane Doe',
            email,
            orders: []
          };
          
          set({ user, isAuthenticated: true });
          return true;
        }
        
        return false;
      },
      
      signup: async (name: string, email: string, password: string) => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock signup logic
        if (name && email && password) {
          const user: User = {
            id: Date.now().toString(),
            name,
            email,
            orders: []
          };
          
          set({ user, isAuthenticated: true });
          return true;
        }
        
        return false;
      },
      
      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
      
      addOrder: (orderData) => {
        const { user } = get();
        if (!user) return;
        
        const newOrder: Order = {
          ...orderData,
          id: Date.now().toString(),
          date: new Date().toISOString(),
        };
        
        const updatedUser = {
          ...user,
          orders: [newOrder, ...user.orders]
        };
        
        set({ user: updatedUser });
      },
    }),
    {
      name: 'elegance-auth-storage',
    }
  )
);