import { useForm } from 'react-hook-form';
import { Button } from '../components/Button';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { FC } from 'react';
import { IProductForm } from '../models/IProductForm';
import { useAppDispatch } from '../hooks/redux';
import { addNewProduct } from '../store/reducers/productsSlice';
import { useNavigate } from 'react-router-dom';

export const CreateProduct: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const schema = yup
    .object({
      title: yup.string().required('Введите название товара'),
      price: yup.number().typeError('Введите цену товара').min(0.01, 'Цена должна быть больше 0').required('Введите цену товара'),
      description: yup.string().required('Введите описание товара'),
      category: yup.string().required('Введите категорию товара'),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IProductForm>({ resolver: yupResolver(schema) });

  const onSubmit = (data: IProductForm) => {
    const file = data.image[0];
    const id = Date.now();

    const obj = {
      id,
      title: data.title,
      price: data.price,
      description: data.description,
      category: data.category,
      image: file ? URL.createObjectURL(file) : 'public/images/plug.png',
      isFavorite: false,
    };

    dispatch(addNewProduct(obj));
    reset();
    navigate('/products');
  };

  return (
    <div>
      <Button />
      <div className="flex flex-col items-center justify-center h-screen">
        <form className="w-[600px] h-[700px] p-15 border-0 rounded-3xl drop-shadow-lg bg-gray-500" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-13 relative">
            <input
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-2xl shadow-sm focus: outline-none"
              {...register('title')}
              placeholder="Название товара"
            />
            {errors.title && <p className="text-red-600 absolute">{errors.title.message}</p>}
          </div>
          <div className="mb-13 relative">
            <input
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-2xl shadow-sm focus: outline-none"
              {...register('price', { valueAsNumber: true })}
              placeholder="Цена товара"
            />
            {errors.price && <p className="text-red-600 absolute">{errors.price.message}</p>}
          </div>
          <div className="mb-13 relative">
            <input
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-2xl shadow-sm focus: outline-none"
              {...register('description')}
              placeholder="Описание товара"
            />
            {errors.description && <p className="text-red-600 absolute">{errors.description.message}</p>}
          </div>
          <div className="mb-13 relative">
            <input
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-2xl shadow-sm focus: outline-none"
              {...register('category')}
              placeholder="Категория товара"
            />
            {errors.category && <p className="text-red-600 absolute">{errors.category.message}</p>}
          </div>
          <div className="mb-13">
            <input {...register('image')} type="file" />
          </div>
          <button
            className="w-full rounded-lg bg-blue-600 px-6 py-3 text-white font-semibold shadow-md transition-all duration-300 hover:bg-blue-500"
            type="submit"
          >
            Добавить товар
          </button>
        </form>
      </div>
    </div>
  );
};
