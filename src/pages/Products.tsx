import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { fetchProducts } from '../store/reducers/ActionCreators';

export const Products = () => {
  const { products, isLoading, error } = useAppSelector((state) => state.productsReducer);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  return (
    <div>
      {isLoading && <h1>Загрузка данных...</h1>}
      {error && <h1>Ошибка: {error}</h1>}
      {JSON.stringify(products)}
    </div>
  );
};
