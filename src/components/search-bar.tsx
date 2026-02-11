import React from 'react';
import SearchBarIcon from './search-bar-icon';

interface SearchBarProps {
  className?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  className = '', 
  placeholder = 'Search Tasks',
  value,
  onChange
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div
      className={`flex items-center border border-[#EFEFEF] rounded-[8px] h-[37px] px-3 bg-white ${className}`}
    >
      <SearchBarIcon className="mr-1.5" />
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full text-sm bg-transparent outline-none text-gray-700 placeholder-gray-400 truncate overflow-hidden"
      />
    </div>
  );
};

export default SearchBar;
