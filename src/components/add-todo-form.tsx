import React, { useRef, useEffect, useState } from 'react';
import ColorPickerBox from './color-picker-box';
import CalendarIcon from './calendar-icon';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';

export interface AddTodoFormProps {
  colorOptions: Array<{ hex: string; name: string; label: string }>;
  selectedColor: { hex: string; name: string; label: string };
  setSelectedColor: (color: { hex: string; name: string; label: string }) => void;
  inputSizeClass?: string;
  onSubmit: (values: { title: string; description: string; dueDate: string | null }) => void;
}

const labelsStyle = 'text-[#4A4A4A] font-lato font-semibold block mb-1';
const AddTodoForm: React.FC<AddTodoFormProps> = ({
  colorOptions,
  selectedColor,
  setSelectedColor,
  inputSizeClass,
  onSubmit,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const selectedIndex = colorOptions.findIndex(c => c.hex === selectedColor.hex);
    const bubble = gridRef.current?.children[selectedIndex] as HTMLElement;
    const container = gridRef.current?.getBoundingClientRect();
    if (bubble && container) {
      bubble.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [selectedColor, colorOptions]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      title,
      description,
      dueDate: dueDate || null,
    });
    setTitle('');
    setDescription('');
    setDueDate('');
  };

  return (
    <form className="w-full" onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className={`${labelsStyle} `}>Task</label>
        <input
          className={`w-full h-[37px] border border-[#CBD5E1] rounded px-2 ${inputSizeClass || ''}`}
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label className={`${labelsStyle} `}>Due date </label>
        <DatePicker
          className={`w-full h-[37px] text-[#ACAAAA] font-normal border border-[#CBD5E1] rounded px-2 ${
            inputSizeClass || ''
          }`}
          value={dueDate ? dayjs(dueDate) : null}
          onChange={(_, dateString) => setDueDate(typeof dateString === 'string' ? dateString : '')}
          format="DD/MM/YYYY"
          suffixIcon={<CalendarIcon />}
          allowClear
          placeholder="DD/MM/YYYY"
        />
      </div>
      <div className="mb-4">
        <label className={`${labelsStyle} `}>
          Description <span className="text-[#9D9D9D]">(opcional)</span>
        </label>
        <textarea
          className="w-full h-[63px] resize-none border  border-[#CBD5E1] rounded px-2 py-1"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className={`${labelsStyle} `}>Choose color</label>
        <div className="border border-[#CBD5E1] rounded-md px-4 py-2 flex items-center bg-white w-full mb-2">
          <div className="w-5 h-5 rounded" style={{ backgroundColor: selectedColor.hex }}></div>
          {[selectedColor.name, selectedColor.hex.replace('#', ''), selectedColor.label].map(
            (text, index) => (
              <span key={index} className="text-sm text-[#ACAAAA] ml-[12px]">
                {text}
              </span>
            ),
          )}
        </div>
        <ColorPickerBox
          colorOptions={colorOptions}
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
        />
      </div>
      <button
        type="submit"
        className="w-full h-[37px] bg-[#A779CA] text-[#FFFFFF] font-semibold rounded-[6px] text-base mt-2"
      >
        Create
      </button>
    </form>
  );
};

export default AddTodoForm;
