import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
};

export const initSlice = createSlice({
  name: 'init',
  initialState,
  reducers: {},
});

export default initSlice.reducer;
