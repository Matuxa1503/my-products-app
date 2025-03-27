import { FC } from 'react';
import { IProduct } from '../models/IProduct';
import { useAppDispatch } from '../hooks/redux';
import { deleteProduct, toggleFavorite } from '../store/reducers/productsSlice';

interface ProductProps {
  product: IProduct;
  showFavorites: boolean;
  setFeaturedProducts: React.Dispatch<React.SetStateAction<IProduct[]>>;
}

export const Product: FC<ProductProps> = ({ product, showFavorites, setFeaturedProducts }) => {
  const dispatch = useAppDispatch();

  const onToggleFavorite = () => {
    dispatch(toggleFavorite(product.id));

    setFeaturedProducts((prev) => {
      const isAlreadyFavorite = prev.some((item) => item.id === product.id);
      if (isAlreadyFavorite) {
        return prev.filter((item) => item.id !== product.id);
      } else {
        return [...prev, { ...product, isFavorite: true }];
      }
    });
  };

  const onDeleteProduct = () => {
    dispatch(deleteProduct(product.id));

    setFeaturedProducts((prev) => {
      return prev.filter((item) => item.id !== product.id);
    });
  };

  return (
    <div className="w-[32%] h-[500px] border rounded-lg p-2 flex flex-col relative">
      {!showFavorites && (
        <svg
          className="absolute top-0 right-0 cursor-pointer"
          onClick={() => onDeleteProduct()}
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M18 6 6 18" />
          <path d="m6 6 12 12" />
        </svg>
      )}
      <h1 className="text-3xl max-w-[380px]">{product.title}</h1>
      <img className="w-[250px] h-[250px] object-contain mx-auto mt-8" src={product.image} alt="" />
      <div className="flex items-center justify-between mt-auto ">
        <p className="text-3xl ">${product.price}</p>
        {product.isFavorite ? (
          <svg
            onClick={() => onToggleFavorite()}
            className="cursor-pointer"
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="red"
            stroke="red"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          </svg>
        ) : (
          <svg
            onClick={() => onToggleFavorite()}
            className="cursor-pointer"
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#ffffff"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          </svg>
        )}
      </div>
    </div>
  );
};
