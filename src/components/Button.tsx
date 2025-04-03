import { FC } from 'react';
import { Link } from 'react-router-dom';

export const Button: FC = () => {
  return (
    <Link to={'/products'}>
      <button className="border rounded-lg px-4 py-2 hover:bg-gray-200 transition-colors">Вернуться к списку товаров</button>
    </Link>
  );
};
