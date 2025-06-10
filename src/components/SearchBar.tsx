type SearchBarProps = {
  className?: string;
  placeholder?: string;
};

export default function SearchBar({ className, placeholder = 'Search tasks' }: SearchBarProps) {
  return (
    <div
      className={`relative flex items-center border border-[#EFEFEF] rounded-[8px] h-[37px] ${className}`}
    >
      <svg
        className="absolute left-3"
        width="13"
        height="13"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M16 16L20 20M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18Z"
          stroke="#C8C8C8"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <input
        type="text"
        placeholder={placeholder}
        className="w-full pl-8 text-sm bg-transparent outline-none text-gray-700 placeholder-gray-400 truncate overflow-hidden"
      />
    </div>
  );
}
