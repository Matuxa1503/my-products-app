import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { FC, useState } from 'react';
import { IProductForm } from '../models/IProductForm';
import { useAppDispatch } from '../hooks/redux';
import { addNewProduct } from '../store/reducers/productsSlice';
import { Link, useNavigate } from 'react-router-dom';
import { FormInput } from '../components/FormInput';

export const CreateProduct: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [fileName, setFileName] = useState('');

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
        <form className="w-[600px] h-[650px] p-15 border-0 rounded-3xl drop-shadow-lg bg-gray-300" onSubmit={handleSubmit(onSubmit)}>
          <FormInput register={register} name={'title'} error={errors.title} placeholder={'Название товара'} />
          <FormInput register={register} name={'price'} error={errors.price} placeholder={'Цена товара'} />
          <FormInput register={register} name={'description'} error={errors.description} placeholder={'Описание товара'} />
          <FormInput register={register} name={'category'} error={errors.category} placeholder={'Категория товара'} />
          <div className="mb-6">
            <label className="inline-block mb-2 px-4 py-2 border text-black  rounded-lg cursor-pointer hover:bg-gray-400 transition-colors">
              Загрузить изображение
              <input
                type="file"
                {...register('image')}
                onChange={(e) => {
                  setFileName(e.target.files?.[0]?.name || '');
                }}
                className="hidden"
              />
            </label>
            {fileName && <span className="text-xl text-gray-700 truncate">{fileName}</span>}
          </div>

          <button
            className="w-full rounded-lg bg-gray-200 px-6 py-3 text-black transition-all duration-300 hover:bg-gray-400"
            type="submit"
          >
            Добавить товар
          </button>
        </form>
      </div>
    </div>
  );
};
