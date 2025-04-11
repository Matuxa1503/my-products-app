import { FC } from 'react';
import { IFormInput, IProductForm } from '../models/IProductForm';

export const FormInput: FC<IFormInput<IProductForm>> = ({ register, name, error, placeholder }) => {
  return (
    <div className="mb-13 relative">
      <input
        className={`w-full rounded-lg border ${
          error ? 'border-red-600' : 'border-black'
        } px-4 py-2 text-2xl shadow-2xl focus: outline-none`}
        {...register(name)}
        placeholder={placeholder}
      />
      {error && <p className="text-red-600 absolute -bottom-8 ">{error.message}</p>}
    </div>
  );
};
