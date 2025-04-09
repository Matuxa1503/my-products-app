import { IProduct } from './../../models/IProduct';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchProducts } from './ActionCreators';

interface ProductsState {
  products: IProduct[];
  isLoading: boolean;
  error: string;
}

const initialState: ProductsState = {
  products: [],
  isLoading: false,
  error: '',
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addNewProduct(state, action: PayloadAction<IProduct>) {
      state.products.push(action.payload);
    },
    toggleStatusFavorite(state, action: PayloadAction<number>) {
      const product = state.products.find((product) => product.id === action.payload);
      if (product) {
        product.isFavorite = !product.isFavorite;
      }
    },
    deleteProduct(state, action: PayloadAction<number>) {
      state.products = state.products.filter((product) => product.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<IProduct[]>) => {
        state.isLoading = false;
        state.error = '';
        state.products = action.payload.map((product) => ({
          ...product,
          isFavorite: false,
        }));
      })
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Ошибка при загрузке данных';
      });
  },
});

export const { addNewProduct, toggleStatusFavorite, deleteProduct } = productsSlice.actions;
export default productsSlice.reducer;
