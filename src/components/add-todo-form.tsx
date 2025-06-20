import React, { useRef, useEffect } from 'react';
import { Form, Input, DatePicker } from 'antd';
import type { FormInstance } from 'antd/es/form';
import ColorPickerBox from './color-picker-box';

export interface AddTodoFormProps {
  form: FormInstance;
  colorOptions: Array<{ hex: string; name: string; label: string }>;
  selectedColor: { hex: string; name: string; label: string };
  setSelectedColor: (color: { hex: string; name: string; label: string }) => void;
  inputSizeClass?: string;
}

const AddTodoForm: React.FC<AddTodoFormProps> = ({
  form,
  colorOptions,
  selectedColor,
  setSelectedColor,
  inputSizeClass = 'w-[367px] h-[37px]',
}) => {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const selectedIndex = colorOptions.findIndex(c => c.hex === selectedColor.hex);
    const bubble = gridRef.current?.children[selectedIndex] as HTMLElement;
    const container = gridRef.current?.getBoundingClientRect();
    if (bubble && container) {
      bubble.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [selectedColor, colorOptions]);

  return (
    <Form form={form} layout="vertical" name="add_todo_form" initialValues={{ remember: true }}>
      <Form.Item
        label="Title"
        name="title"
        rules={[{ required: true, message: 'Please enter the task title!' }]}
      >
        <Input style={{ width: '367px', height: '37px' }} />
      </Form.Item>

      <Form.Item name="dueDate" label="Due Date" style={{ width: '367px' }}>
        <DatePicker
          className={inputSizeClass}
          placeholder="DD/MM/YYYY"
          format="DD/MM/YYYY"
        />
      </Form.Item>

      <Form.Item name="description" label="Description">
        <Input.TextArea style={{ width: '367px', height: '63px' }} />
      </Form.Item>

      <Form.Item label="Choose color">
        <div
          className={`border border-[#ACAAAA] rounded-md px-4 py-2 flex items-center gap-3 bg-white ${inputSizeClass}`}
          style={{ userSelect: 'none' }}
        >
          <div className="w-5 h-5 rounded" style={{ backgroundColor: selectedColor.hex }}></div>
          <span className="text-sm text-gray-700 font-semibold">{selectedColor.name}</span>
          <span className="text-sm text-gray-500">{selectedColor.hex}</span>
          <span className="text-sm text-gray-400">{selectedColor.label}</span>
        </div>
        <ColorPickerBox
          colorOptions={colorOptions}
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
        />
      </Form.Item>
    </Form>
  );
};

export default AddTodoForm;
