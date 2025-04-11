import { FC } from 'react';
import { IProduct } from '../models/IProduct';
import { useAppDispatch } from '../hooks/redux';
import { Link } from 'react-router-dom';
import { removeFromFavorites, toggleFavorite } from '../store/reducers/favoritesSlice';
import { deleteProduct, toggleStatusFavorite } from '../store/reducers/productsSlice';

interface ProductProps {
  product: IProduct;
  showFavorites: boolean;
}

export const Product: FC<ProductProps> = ({ product, showFavorites }) => {
  const dispatch = useAppDispatch();

  const onToggleFavorite = () => {
    dispatch(toggleStatusFavorite(product.id));
    dispatch(toggleFavorite(product));
  };

  const onDeleteProduct = () => {
    dispatch(removeFromFavorites(product.id));
    dispatch(deleteProduct(product.id));
  };

  return (
    <Link className="w-[32%] h-[500px] border rounded-lg p-2 flex flex-col relative group" to={`/products/${product.id}`}>
      {!showFavorites && (
        <svg
          className="absolute top-0 right-0 cursor-pointer z-10 transition-transform duration-300 hover:scale-80"
          onClick={(e) => {
            e.preventDefault();
            onDeleteProduct();
          }}
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 6 6 18" />
          <path d="m6 6 12 12" />
        </svg>
      )}
      <img className="w-[250px] h-[250px] object-contain mx-auto mt-8" src={product.image} alt="" />
      <h1 className="text-2xl font-normal my-auto text-center">{product.title}</h1>
      <div className="flex items-center justify-between mt-auto">
        <p className="text-3xl ">{product.price} $</p>
        {product.isFavorite ? (
          <svg
            onClick={(e) => {
              e.preventDefault();
              onToggleFavorite();
            }}
            className="cursor-pointer"
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="red"
            stroke="red"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          </svg>
        ) : (
          <svg
            onClick={(e) => {
              e.preventDefault();
              onToggleFavorite();
            }}
            className="cursor-pointer opacity-0 group-hover:opacity-100 transition duration-200"
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="gray"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          </svg>
        )}
      </div>
    </Link>
  );
};
