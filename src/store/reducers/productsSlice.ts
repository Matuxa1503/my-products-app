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
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<IProduct[]>) => {
        state.isLoading = false;
        state.error = '';
        state.products = action.payload;
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

export default productsSlice.reducer;
