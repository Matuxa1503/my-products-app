import { FieldError } from 'react-hook-form';

export interface IProductForm {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: any;
}

export interface IFormInput {
  register: any;
  error: FieldError | undefined;
  name: string;
  placeholder: string;
}
