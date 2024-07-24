import { create } from 'zustand';

export const useCartStore = create((set) => ({
  items_in_cart: [],
  updateCart: (item_id: number, item_quantity: number, item_stock: number) => set((state) => {
    const item = state.items_in_cart.find((item) => item.id === item_id);
    if (item) {
      item.quantity = item_quantity;
      item.stock = item_stock;
      return { items_in_cart: state.items_in_cart };
    } else {
      return { items_in_cart: [...state.items_in_cart, { id: item_id, quantity: item_quantity, stock: item_stock }] };
    }
  }),
}));