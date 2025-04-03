import { FC, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { fetchProducts } from '../store/reducers/ActionCreators';
import { Product } from '../components/Product';
import { Link } from 'react-router-dom';
import { usePagination } from '../hooks/pagination';

export const Products: FC = () => {
  const { products, isLoading, error } = useAppSelector((state) => state.productsReducer);
  const { favorites } = useAppSelector((state) => state.favoritesReducer);
  const dispatch = useAppDispatch();
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
              <button className={`border rounded-lg px-4 py-2 ${!showFavorites && 'bg-gray-300'}`} onClick={() => setShowFavorites(false)}>
                Все товары
              </button>
              <button className={`border rounded-lg px-4 py-2 ${showFavorites && 'bg-gray-300'}`} onClick={() => setShowFavorites(true)}>
                Избранные товары
              </button>
            </div>
            <Link to={'/create-product'} className="border rounded-lg px-4 py-2 hover:bg-gray-200 transition-colors">
              Добавить новый элемент
            </Link>
          </div>

          {!showFavorites && (
            <div className="w-[400px] flex justify-between my-6">
              <button
                className={`px-4 py-2 border rounded-lg ${
                  currentPage === 1 ? 'bg-gray-300 text-gray-600 cursor-auto' : 'hover:bg-gray-200 transition-colors'
                }`}
                onClick={() => prevPage()}
                disabled={currentPage === 1}
              >
                Назад
              </button>

              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  className={`${currentPage === index + 1 && 'text-red-700'}`}
                  key={index + 1}
                  onClick={() => setPage(index + 1)}
                  disabled={currentPage === index + 1}
                >
                  {index + 1}
                </button>
              ))}

              <button
                className={`px-4 py-2 border rounded-lg ${
                  currentPage === totalPages ? 'bg-gray-300 text-gray-600 cursor-auto' : 'hover:bg-gray-200 transition-colors'
                }`}
                onClick={() => nextPage()}
                disabled={currentPage === totalPages}
              >
                Вперед
              </button>
            </div>
          )}

          <div className="flex flex-wrap justify-between gap-y-8 gap-x-2">
            {/* Если showFavorites изменили на true в кнопке выше то показываем избранные товары. Если товары не добавлены
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
