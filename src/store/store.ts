import { combineReducers, configureStore } from '@reduxjs/toolkit';
import productsReducer from './reducers/productsSlice';
import productReducer from './reducers/productSlice';

const rootReducer = combineReducers({
  productsReducer,
  productReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
