import { FC, useState } from 'react';
import { FormInput } from './FormInput';
import { useForm } from 'react-hook-form';
import { IProductForm } from '../models/IProductForm';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

interface ProductFormProps {
  onSubmit: (data: IProductForm, resetForm: () => void) => void;
  valueBtn: string;
  defaultValues?: IProductForm;
}

export const Form: FC<ProductFormProps> = ({ onSubmit, valueBtn, defaultValues }) => {
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
  } = useForm<IProductForm>({ defaultValues, resolver: yupResolver(schema) });

  return (
    <form
      onSubmit={handleSubmit((data) => onSubmit(data, () => reset()))}
      className="absolute top-[5%] left-[30%] w-[600px] h-[650px] p-15 border-0 rounded-3xl drop-shadow-lg bg-gray-300"
    >
      <FormInput register={register} name={'title'} error={errors.title} placeholder={'Название товара'} />
      <FormInput register={register} name={'price'} error={errors.price} placeholder={'Цена товара'} />
      <FormInput register={register} name={'description'} error={errors.description} placeholder={'Описание товара'} />
      <FormInput register={register} name={'category'} error={errors.category} placeholder={'Категория товара'} />
      <div className="mb-6 relative">
        <label
          htmlFor="image"
          className="relative inline-block z-10 mb-2 px-4 py-2 border text-black rounded-lg cursor-pointer hover:bg-gray-400 transition-colors"
        >
          Загрузить изображение
        </label>

        <input
          type="file"
          id="image"
          {...register('image')}
          onChange={(e) => {
            setFileName(e.target.files?.[0]?.name || '');
          }}
          className="absolute top-0 left-0 z-1 w-3 opacity-0"
        />

        {fileName && <span className="text-xl text-gray-700 truncate">{fileName}</span>}
      </div>

      <button className="w-full rounded-lg bg-gray-200 px-6 py-3 text-black transition-all duration-300 hover:bg-gray-400" type="submit">
        {valueBtn}
      </button>
    </form>
  );
};
