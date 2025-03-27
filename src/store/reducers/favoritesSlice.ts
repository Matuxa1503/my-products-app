import { IProduct } from './../../models/IProduct';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface favoritesSlice {
  favorites: IProduct[];
}

const initialState: favoritesSlice = {
  favorites: [],
};

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite(state, action: PayloadAction<IProduct>) {
      const existing = state.favorites.find((item) => item.id === action.payload.id);
      if (existing) {
        state.favorites = state.favorites.filter((item) => item.id !== action.payload.id);
      } else {
        state.favorites.push({ ...action.payload, isFavorite: true });
      }
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
