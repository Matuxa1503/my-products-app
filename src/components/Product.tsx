import { FC } from 'react';
import { IProduct } from '../models/IProduct';
import { useAppDispatch } from '../hooks/redux';
import { toggleFavorite } from '../store/reducers/productsSlice';

interface ProductProps {
  product: IProduct;
}

export const Product: FC<ProductProps> = ({ product }) => {
  const dispatch = useAppDispatch();

  const onToggleFavorite = () => {
    dispatch(toggleFavorite(product.id));
  };

  return (
    <div className="w-[32%] h-[500px]  border rounded-lg p-2 flex flex-col relative">
      <svg
        className="absolute top-0 right-0 cursor-pointer"
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
      <h1 className="text-3xl mt-6">{product.title}</h1>
      <p className="my-3 text-1xl h-[100px] overflow-hidden">{product.description}</p>
      <img className="w-[200px] h-[200px] object-contain mx-auto my-8" src={product.image} alt="" />
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
