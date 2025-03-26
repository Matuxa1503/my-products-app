import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { fetchProducts } from '../store/reducers/ActionCreators';
import { Product } from '../components/Product';

export const Products: FC = () => {
  const { products, isLoading, error } = useAppSelector((state) => state.productsReducer);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  return (
    <div className="flex flex-wrap justify-between gap-y-8 gap-x-2">
      {isLoading && <h1>Загрузка данных...</h1>}
      {error && <h1>Ошибка: {error}</h1>}
      {products.map((item) => (
        <Product key={item.id} product={item} />
      ))}
    </div>
  );
};
