import { FC } from 'react';
import { IFormInput, IProductForm } from '../models/IProductForm';

export const FormInput: FC<IFormInput<IProductForm>> = ({ register, name, error, placeholder }) => {
  return (
    <div className="mb-13 relative">
      <input
        className="w-full rounded-lg border border-gray-300 px-4 py-2 text-2xl shadow-sm focus: outline-none"
        {...register(name)}
        placeholder={placeholder}
      />
      {error && <p className="text-red-600 absolute">{error.message}</p>}
    </div>
  );
};
