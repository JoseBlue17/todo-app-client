import { useState, useRef } from 'react';
import { Form } from 'antd';
import { colorOptions } from './color-options';

export function useAddTodoModal() {
  const [form] = Form.useForm();
  const [selectedColor, setSelectedColor] = useState(colorOptions[0]);
  const gridRef = useRef<HTMLDivElement>(null);

  return { form, selectedColor, setSelectedColor, gridRef };
}
