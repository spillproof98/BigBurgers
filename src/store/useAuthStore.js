import { create } from 'zustand';
import useCartStore from './useCartStore';

const initialRole = localStorage.getItem('role'); // ✅ Persisted value

const useAuthStore = create(set => ({
  user: null,
  role: initialRole || null, // ✅ Initialize with localStorage

  setUser: user => {
    useCartStore.getState().clearCart(); // Clear cart on login
    set({ user });
  },

  setRole: role => {
    localStorage.setItem('role', role); // ✅ Store in localStorage
    set({ role });
  },

  logout: () => {
    useCartStore.getState().clearCart(); // Clear cart on logout
    localStorage.removeItem('role');     // ✅ Remove from localStorage
    set({ user: null, role: null });
  }
}));

export default useAuthStore;
