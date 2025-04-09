import { FC, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { fetchProducts } from '../store/reducers/ActionCreators';
import { Product } from '../components/Product';
import { Link } from 'react-router-dom';
import { usePagination } from '../hooks/pagination';
import { Button } from '../components/Button';

export const Products: FC = () => {
  const dispatch = useAppDispatch();
  const { products, isLoading, error } = useAppSelector((state) => state.productsReducer);
  const { favorites } = useAppSelector((state) => state.favoritesReducer);
  const [showFavorites, setShowFavorites] = useState<boolean>(false);

  // pagination
  const ITEMS_PER_PAGE = 6;
  const { currentPage, totalPages, startIndex, setPage, prevPage, nextPage } = usePagination(ITEMS_PER_PAGE, products.length);
  const paginatedProducts = products.slice(startIndex, startIndex + ITEMS_PER_PAGE);

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
          <div className="flex justify-between mb-2">
            <div className="flex gap-3">
              <Button onClick={() => setShowFavorites(false)} text={'Все товары'} styles={!showFavorites && 'bg-gray-300'} />
              <Button onClick={() => setShowFavorites(true)} text={'Избранные товары'} styles={showFavorites && 'bg-gray-300'} />
            </div>
            <Link to={'/create-product'} className="border rounded-lg px-4 py-2 hover:bg-gray-200 transition-colors">
              Добавить новый элемент
            </Link>
          </div>

          {/* пагинацию в др файл */}
          {!showFavorites && (
            <div className="w-[400px] flex justify-between my-6">
              <Button
                onClick={() => prevPage()}
                disabled={currentPage === 1}
                text={'Назад'}
                styles={currentPage === 1 ? 'bg-gray-300 text-gray-600 cursor-auto' : 'hover:bg-gray-200 transition-colors'}
              />

              {Array.from({ length: totalPages }, (_, index) => (
                <Button
                  key={index + 1}
                  onClick={() => setPage(index + 1)}
                  disabled={currentPage === index + 1}
                  text={index + 1}
                  styles={currentPage === index + 1 && 'text-red-700'}
                />
              ))}

              <Button
                onClick={() => nextPage()}
                disabled={currentPage === totalPages}
                text={'Вперед'}
                styles={currentPage === totalPages ? 'bg-gray-300 text-gray-600 cursor-auto' : 'hover:bg-gray-200 transition-colors'}
              />
            </div>
          )}

          <div className="flex flex-wrap justify-between gap-y-8 gap-x-2">
            {/* Если showFavorites изменили на true то показываем избранные товары. Если товары не добавлены
            то показываем "Товаров в избранном пока нет"*/}
            {showFavorites && favorites.length === 0 && <h1 className="text-6xl mt-4">Товаров в избранном пока нет</h1>}
            {(showFavorites ? favorites : paginatedProducts).map((item) => (
              <Product key={item.id} product={item} showFavorites={showFavorites} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
