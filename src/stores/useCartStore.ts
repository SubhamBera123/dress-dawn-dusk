import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  size: string;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string, size: string) => void;
  updateQuantity: (id: string, size: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      
      addItem: (newItem) => set((state) => {
        const existingItem = state.items.find(
          item => item.id === newItem.id && item.size === newItem.size
        );
        
        if (existingItem) {
          return {
            items: state.items.map(item =>
              item.id === newItem.id && item.size === newItem.size
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          };
        }
        
        return {
          items: [...state.items, { ...newItem, quantity: 1 }]
        };
      }),
      
      removeItem: (id, size) => set((state) => ({
        items: state.items.filter(item => !(item.id === id && item.size === size))
      })),
      
      updateQuantity: (id, size, quantity) => set((state) => ({
        items: quantity <= 0 
          ? state.items.filter(item => !(item.id === id && item.size === size))
          : state.items.map(item =>
              item.id === id && item.size === size
                ? { ...item, quantity }
                : item
            )
      })),
      
      clearCart: () => set({ items: [] }),
      
      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },
      
      getTotalPrice: () => {
        return get().items.reduce((total, item) => total + (item.price * item.quantity), 0);
      },
      
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
    }),
    {
      name: 'elegance-cart-storage',
    }
  )
);