import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product, mockProducts } from '@/data/products';

interface ProductsState {
  items: Product[];
  searchQuery: string;
  selectedCategory: string;
  priceRange: [number, number];
}

const initialState: ProductsState = {
  items: mockProducts,
  searchQuery: '',
  selectedCategory: 'All',
  priceRange: [0, 500],
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setSelectedCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
    },
    setPriceRange: (state, action: PayloadAction<[number, number]>) => {
      state.priceRange = action.payload;
    },
    addProduct: (state, action: PayloadAction<Product>) => {
      state.items.push(action.payload);
    },
    updateProduct: (state, action: PayloadAction<Product>) => {
      const index = state.items.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    deleteProduct: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(p => p.id !== action.payload);
    },
    updateStock: (state, action: PayloadAction<{ id: string; stock: number }>) => {
      const product = state.items.find(p => p.id === action.payload.id);
      if (product) {
        product.stock = action.payload.stock;
      }
    },
  },
});

export const {
  setSearchQuery,
  setSelectedCategory,
  setPriceRange,
  addProduct,
  updateProduct,
  deleteProduct,
  updateStock,
} = productsSlice.actions;

export default productsSlice.reducer;
