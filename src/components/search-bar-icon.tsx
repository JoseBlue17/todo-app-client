import React from 'react';

interface SearchBarIconProps {
  className?: string;
}

const SearchBarIcon: React.FC<SearchBarIconProps> = ({ className = '' }) => (
  <svg
    className={className}
    width="15"
    height="15"
    viewBox="0 0 15 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M14.0667 14.0667L10.3333 10.3333M6.6 12.2C3.50721 12.2 1 9.69279 1 6.6C1 3.50721 3.50721 1 6.6 1C9.69279 1 12.2 3.50721 12.2 6.6C12.2 9.69279 9.69279 12.2 6.6 12.2Z"
      stroke="#C8C8C8"
      strokeWidth="2"
    />
  </svg>
);

export default SearchBarIcon;
