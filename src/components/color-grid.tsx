import React, { useRef } from 'react';

interface ColorOption {
  hex: string;
  name: string;
  label: string;
}

interface ColorGridProps {
  colorOptions: ColorOption[];
  selectedColor: ColorOption;
  setSelectedColor: (color: ColorOption) => void;
}

const ColorGrid: React.FC<ColorGridProps> = ({ colorOptions, selectedColor, setSelectedColor }) => {
  const gridRef = useRef<HTMLDivElement>(null);
  return (
    <div className="relative flex flex-col items-center w-full max-w-[367px] sm:max-w-full h-[114px]">
      <svg
        width="100%"
        height="114"
        viewBox="0 0 367 114"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute top-0 left-0 z-0 w-full h-[114px]"
        preserveAspectRatio="none"
      >
        <path
          d="M120.998 1.77441C121.53 1.21774 122.388 1.15853 122.988 1.61426L123.105 1.71289L130.371 8.48047C130.649 8.73895 131.014 8.88281 131.394 8.88281H361C364.038 8.88281 366.5 11.3452 366.5 14.3828V108C366.5 111.038 364.038 113.5 361 113.5H6C2.96243 113.5 0.5 111.038 0.5 108V14.3828C0.5 11.3452 2.96243 8.88281 6 8.88281H113.572C113.931 8.88276 114.276 8.75404 114.546 8.52344L114.657 8.41797L120.998 1.77441Z"
          stroke="#CBD5E1"
        />
      </svg>
      <div
        className="grid grid-cols-7 gap-3 px-[10px] pt-[21px] pb-[13px] w-full h-full box-border relative z-10 max-w-full overflow-x-auto justify-items-center items-center"
        ref={gridRef}
      >
        {colorOptions.map(color => (
          <button
            key={color.hex}
            type="button"
            className={'w-7 h-7 rounded-md flex items-center justify-center'}
            style={{ backgroundColor: color.hex }}
            onClick={e => {
              e.stopPropagation();
              setSelectedColor(color);
            }}
          >
            {selectedColor.hex === color.hex && (
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M9 18C10.1819 18 11.3522 17.7672 12.4442 17.3149C13.5361 16.8626 14.5282 16.1997 15.364 15.364C16.1997 14.5282 16.8626 13.5361 17.3149 12.4442C17.7672 11.3522 18 10.1819 18 9C18 7.8181 17.7672 6.64778 17.3149 5.55585C16.8626 4.46392 16.1997 3.47177 15.364 2.63604C14.5282 1.80031 13.5361 1.13738 12.4442 0.685084C11.3522 0.232792 10.1819 -1.76116e-08 9 0C6.61305 3.55683e-08 4.32387 0.948211 2.63604 2.63604C0.948212 4.32387 0 6.61305 0 9C0 11.3869 0.948212 13.6761 2.63604 15.364C4.32387 17.0518 6.61305 18 9 18ZM13.768 6.64C13.8558 6.53964 13.9226 6.42274 13.9646 6.29617C14.0065 6.1696 14.0227 6.03591 14.0123 5.90298C14.0018 5.77006 13.9648 5.64056 13.9036 5.52213C13.8423 5.40369 13.758 5.29871 13.6555 5.21334C13.5531 5.12798 13.4346 5.06396 13.3071 5.02506C13.1796 4.98616 13.0455 4.97316 12.9129 4.98683C12.7802 5.00049 12.6517 5.04055 12.5347 5.10463C12.4178 5.16872 12.3149 5.25554 12.232 5.36L8.634 9.677C8.287 10.093 8.092 10.324 7.937 10.465L7.931 10.471L7.924 10.466C7.756 10.339 7.541 10.127 7.159 9.744L5.707 8.293C5.5184 8.11084 5.2658 8.01005 5.0036 8.01233C4.7414 8.0146 4.49059 8.11977 4.30518 8.30518C4.11977 8.49059 4.0146 8.7414 4.01233 9.0036C4.01005 9.2658 4.11084 9.5184 4.293 9.707L5.744 11.158L5.785 11.199C6.112 11.526 6.425 11.84 6.718 12.061C7.045 12.309 7.474 12.541 8.023 12.517C8.573 12.492 8.979 12.221 9.283 11.945C9.553 11.698 9.838 11.357 10.133 11.002L10.17 10.958L13.768 6.64Z"
                  fill="black"
                  fillOpacity="0.5"
                />
              </svg>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ColorGrid;
