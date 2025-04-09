import { FC, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAppSelector } from '../hooks/redux';
import { IProduct } from '../models/IProduct';

export const ProductDetail: FC = () => {
  const { products, isLoading, error } = useAppSelector((state) => state.productsReducer);
  const { id } = useParams();
  const [product, setProduct] = useState<IProduct | null>(null);

  useEffect(() => {
    if (products) {
      const product = products.find((p) => p.id === Number(id)) || null;
      setProduct(product);
    }
  }, [products, id]);

  if (isLoading) {
    return <h1>Загрузка данных...</h1>;
  }
  if (!product) {
    return <h1>Товар не найден</h1>;
  }
  if (error) {
    return <h1>Ошибка: {error}</h1>;
  }

  return (
    <div>
      <Link to={'/products'} className="border rounded-lg px-4 py-2 hover:bg-gray-200 transition-colors">
        Вернуться на главную
      </Link>

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
