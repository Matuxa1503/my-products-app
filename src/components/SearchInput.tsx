import { FC } from 'react';

interface SearchInputProps {
  searchItem: string;
  setSearchItem: (value: string) => void;
}

export const SearchInput: FC<SearchInputProps> = ({ searchItem, setSearchItem }) => {
  return (
    <div className="relative">
      <input
        className="block border rounded-lg px-4 py-2"
        placeholder="Поиск товаров"
        value={searchItem}
        onChange={(e) => {
          const value = e.target.value;
          if (value !== ' ') setSearchItem(value);
        }}
        type="text"
      />
      {searchItem && (
        <svg
          className="absolute top-1.5 right-1 cursor cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            setSearchItem('');
          }}
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 6 6 18" />
          <path d="m6 6 12 12" />
        </svg>
      )}
    </div>
  );
};
