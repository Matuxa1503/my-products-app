import { FC } from 'react';
import { Button } from './Button';
import { IPagination } from '../models/IPagination';

export const Pagination: FC<IPagination> = ({ currentPage, totalPages, setPage, prevPage, nextPage }) => {
  return (
    <div className="w-[400px] flex justify-between my-6">
      <Button
        onClick={() => prevPage()}
        disabled={currentPage === 1}
        text={'Назад'}
        styles={currentPage === 1 ? 'bg-gray-300 text-gray-600 cursor-auto' : 'hover:bg-gray-200 transition-colors'}
      />

      {Array.from({ length: totalPages }, (_, index) => (
        <Button
          key={index + 1}
          onClick={() => setPage(index + 1)}
          disabled={currentPage === index + 1}
          text={index + 1}
          styles={currentPage === index + 1 && 'text-red-700'}
        />
      ))}

      <Button
        onClick={() => nextPage()}
        disabled={currentPage === totalPages}
        text={'Вперед'}
        styles={currentPage === totalPages ? 'bg-gray-300 text-gray-600 cursor-auto' : 'hover:bg-gray-200 transition-colors'}
      />
    </div>
  );
};
