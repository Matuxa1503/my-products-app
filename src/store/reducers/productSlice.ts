import { IProduct } from './../../models/IProduct';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchProduct } from './ActionCreators';

interface ProductState {
  product: IProduct;
  isLoading: boolean;
  error: string;
}

const initialState: ProductState = {
  product: {
    id: 0,
    title: '',
    description: '',
    category: '',
    price: 0,
    image: '#',
    rating: { rate: 0, count: 0 },
  },
  isLoading: false,
  error: '',
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProduct.fulfilled, (state, action: PayloadAction<IProduct>) => {
        state.isLoading = false;
        state.error = '';
        state.product = action.payload;
      })
      .addCase(fetchProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Ошибка при загрузке данных';
      });
  },
});

export default productSlice.reducer;
