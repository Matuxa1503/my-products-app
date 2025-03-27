import axios from 'axios';
import { IProduct } from '../../models/IProduct';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchProducts = createAsyncThunk('product/fetchAll', async () => {
  const res = await axios.get<IProduct[]>('https://fakestoreapi.com/products');
  return res.data;
});

export const fetchProduct = createAsyncThunk('product/fetchById', async (id: string) => {
  const res = await axios.get<IProduct>(`https://fakestoreapi.com/products/${id}`);
  return res.data;
});
