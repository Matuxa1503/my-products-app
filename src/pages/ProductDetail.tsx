import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { fetchProduct } from '../store/reducers/ActionCreators';
import { Button } from '../components/Button';

export const ProductDetail: FC = () => {
  const { product, isLoading, error } = useAppSelector((state) => state.productReducer);
  const dispatch = useAppDispatch();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(fetchProduct(id));
    }
  }, [dispatch, id]);

  return (
    <div>
      {isLoading && <h1>Загрузка данных...</h1>}
      {error && <h1>Ошибка: {error}</h1>}
      <Button />
      <div className="mt-4">
        <h1 className="text-4xl">{product.title}</h1>
        <p className="py-3 first-letter:capitalize">{product.description}</p>
        <p>Категория: {product.category}</p>
        <div className="flex items-end gap-20">
          <img className="w-[500px] mt-5" src={product.image} />
          <div>
            {product.rating?.rate && <p className="text-3xl">Оценка: {product.rating.rate} / 5</p>}
            {product.rating?.count && <p className="text-3xl">Куплено: {product.rating.count}</p>}
            <p className="text-5xl">Стоимость: ${product.price}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
