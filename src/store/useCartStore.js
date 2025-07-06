import { create } from 'zustand';

const useCartStore = create(set => ({
  cartItems: [],
  addToCart: item =>
    set(state => {
      const exists = state.cartItems.find(i => i._id === item._id);
      if (exists) {
        return {
          cartItems: state.cartItems.map(i =>
            i._id === item._id ? { ...i, quantity: i.quantity + 1 } : i
          )
        };
      }
      return { cartItems: [...state.cartItems, { ...item, quantity: 1 }] };
    }),

  increment: item =>
    set(state => ({
      cartItems: state.cartItems.map(i =>
        i._id === item._id ? { ...i, quantity: i.quantity + 1 } : i
      )
    })),

  decrement: item =>
    set(state => ({
      cartItems: state.cartItems
        .map(i =>
          i._id === item._id ? { ...i, quantity: i.quantity - 1 } : i
        )
        .filter(i => i.quantity > 0)
    })),

  removeFromCart: item =>
    set(state => ({
      cartItems: state.cartItems.filter(i => i._id !== item._id)
    })),

  clearCart: () => set({ cartItems: [] })
}));

export default useCartStore;
