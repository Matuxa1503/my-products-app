import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { FC } from 'react';
import { IProductForm } from '../models/IProductForm';
import { useAppDispatch } from '../hooks/redux';
import { addNewProduct } from '../store/reducers/productsSlice';
import { Link, useNavigate } from 'react-router-dom';
import { FormInput } from '../components/FormInput';

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
    let img;
    const id = Date.now();

    if (data.image) {
      img = URL.createObjectURL(data.image[0]); // отображение выбранного изображения
    } else {
      img = 'public/images/plug.png';
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
        <form className="w-[600px] h-[700px] p-15 border-0 rounded-3xl drop-shadow-lg bg-gray-500" onSubmit={handleSubmit(onSubmit)}>
          <FormInput register={register} name={'title'} error={errors.title} placeholder={'Название товара'} />
          <FormInput register={register} name={'price'} error={errors.price} placeholder={'Цена товара'} />
          <FormInput register={register} name={'description'} error={errors.description} placeholder={'Описание товара'} />
          <FormInput register={register} name={'category'} error={errors.category} placeholder={'Категория товара'} />
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
