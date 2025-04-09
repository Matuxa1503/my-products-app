import { FC } from 'react';
import { IButton } from '../models/IButton';

export const Button: FC<IButton> = ({ onClick, disabled, text, styles = '' }) => {
  return (
    <button disabled={disabled} onClick={onClick} className={`border rounded-lg px-4 py-2 ${styles}`}>
      {text}
    </button>
  );
};
