import { FC, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { fetchProducts } from '../store/reducers/ActionCreators';
import { Product } from '../components/Product';
import { Link } from 'react-router-dom';
import { usePagination } from '../hooks/pagination';
import { Button } from '../components/Button';
import { Pagination } from '../components/Pagination';

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

  if (isLoading) {
    return <h1>Загрузка данных...</h1>;
  }
  if (error) {
    return <h1>Ошибка: {error}</h1>;
  }

  return (
    <div>
      <div className="flex justify-between mb-2">
        <div className="flex gap-3">
          <Button
            onClick={() => setShowFavorites(false)}
            text={'Все товары'}
            styles={`${!showFavorites && 'bg-gray-300 cursor-auto'} ${showFavorites && 'hover:bg-gray-200 transition-colors'}`}
          />
          <Button
            onClick={() => setShowFavorites(true)}
            text={'Избранные товары'}
            styles={`${showFavorites && 'bg-gray-300 cursor-auto'} ${!showFavorites && 'hover:bg-gray-200 transition-colors'}`}
          />
        </div>
        <Link to={'/create-product'} className="border rounded-lg px-4 py-2 hover:bg-gray-200 transition-colors">
          Добавить новый элемент
        </Link>
      </div>

      {/* pagination */}
      {!showFavorites && (
        <Pagination currentPage={currentPage} totalPages={totalPages} setPage={setPage} prevPage={prevPage} nextPage={nextPage} />
      )}

      <div className="flex flex-wrap justify-between gap-y-8 gap-x-2">
        {showFavorites && favorites.length === 0 && <h1 className="text-6xl mt-4">Товаров в избранном пока нет</h1>}
        {(showFavorites ? favorites : paginatedProducts).map((item) => (
          <Product key={item.id} product={item} showFavorites={showFavorites} />
        ))}
      </div>
    </div>
  );
};
