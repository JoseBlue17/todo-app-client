import React from 'react';
import ColorGrid from './color-grid';

interface ColorOption {
  hex: string;
  name: string;
  label: string;
}

interface ColorPickerBoxProps {
  colorOptions: ColorOption[];
  selectedColor: ColorOption;
  setSelectedColor: (color: ColorOption) => void;
  showInfo?: boolean;
}

const ColorPickerBox: React.FC<ColorPickerBoxProps> = ({
  colorOptions,
  selectedColor,
  setSelectedColor,
  showInfo,
}) => {
  return (
    <div className="w-full mt-1 flex flex-col ">
      {showInfo && (
        <div
          className="border border-[#ACAAAA] rounded-md px-4 py-2 mb-3 flex items-center gap-3 bg-white max-w-full"
          style={{ userSelect: 'none' }}
        >
          <div className="w-5 h-5 rounded" style={{ backgroundColor: selectedColor.hex }}></div>
          <span className="text-sm text-gray-700 font-semibold">{selectedColor.name}</span>
          <span className="text-sm text-gray-500">{selectedColor.hex}</span>
          <span className="text-sm text-gray-400">{selectedColor.label}</span>
        </div>
      )}
      <ColorGrid
        colorOptions={colorOptions}
        selectedColor={selectedColor}
        setSelectedColor={setSelectedColor}
      />
    </div>
  );
};

export default ColorPickerBox;
