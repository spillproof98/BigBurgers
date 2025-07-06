import { create } from 'zustand';
import { GET_ALL_PRODUCTS } from '../graphql/queries';
import client from '../apollo';

const useViewStore = create(set => ({
  items: [],
  setItems: items => set({ items }),
  fetchItems: async () => {
    try {
      const { data } = await client.query({
        query: GET_ALL_PRODUCTS,
        fetchPolicy: 'network-only',
      });
      set({ items: data.products });
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  },
}));

export default useViewStore;
