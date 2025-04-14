import { FC } from 'react';
import { IProductForm } from '../models/IProductForm';
import { useAppDispatch } from '../hooks/redux';
import { addNewProduct } from '../store/reducers/productsSlice';
import { Link, useNavigate } from 'react-router-dom';
import { Form } from '../components/Form';

export const CreateProduct: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit = (data: IProductForm, reset: () => void) => {
    let img;
    const id = Date.now();

    if (data.image?.length) {
      img = URL.createObjectURL(data.image[0]); // отображение выбранного изображения
    } else {
      img = '/images/plug.png';
    }

    const obj = {
      id,
      title: data.title,
      price: data.price,
      description: data.description,
      category: data.category,
      image: img,
      isFavorite: false,
    };

    dispatch(addNewProduct(obj));
    reset();
    navigate('/products');
  };

  return (
    <div>
      <Link to={'/products'} className="border rounded-lg px-4 py-2 hover:bg-gray-200 transition-colors">
        Вернуться к списку товаров
      </Link>

      <div className="flex flex-col items-center justify-center h-screen">
        <Form onSubmit={onSubmit} valueBtn={'Добавить товар'} />
      </div>
    </div>
  );
};
