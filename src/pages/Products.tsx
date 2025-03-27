import { FC, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { fetchProducts } from '../store/reducers/ActionCreators';
import { Product } from '../components/Product';

export const Products: FC = () => {
  const { products, isLoading, error } = useAppSelector((state) => state.productsReducer);
  const { favorites } = useAppSelector((state) => state.favoritesReducer);
  const dispatch = useAppDispatch();

  const [showFavorites, setShowFavorites] = useState<boolean>(false);

  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products.length]);

  return (
    <div>
      {isLoading && <h1>Загрузка данных...</h1>}
      {error && <h1>Ошибка: {error}</h1>}

      {!isLoading && !error && (
        <>
          <div className="flex gap-3 mb-2">
            <button className={`border rounded-lg px-4 py-2 ${!showFavorites && 'bg-gray-300'}`} onClick={() => setShowFavorites(false)}>
              Все товары
            </button>
            <button className={`border rounded-lg px-4 py-2 ${showFavorites && 'bg-gray-300'}`} onClick={() => setShowFavorites(true)}>
              Избранные товары
            </button>
          </div>

          <div className="flex flex-wrap justify-between gap-y-8 gap-x-2">
            {/* Если showFavorites изменили на true в кнопке выше то показываем избранные товары. Если товары не добавлены
            то показываем "Товаров в избранном пока нет"*/}
            {showFavorites && favorites.length === 0 && <h1 className="text-6xl mt-4">Товаров в избранном пока нет</h1>}
            {(showFavorites ? favorites : products).map((item) => (
              <Product key={item.id} product={item} showFavorites={showFavorites} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
