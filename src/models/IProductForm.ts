import { FieldError, Path, UseFormRegister } from 'react-hook-form';

export interface IProductForm {
  id?: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image?: FileList;
}

export interface IFormInput<T extends IProductForm> {
  register: UseFormRegister<T>;
  name: Path<T>;
  error?: FieldError;
  placeholder: string;
}
