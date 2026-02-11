import { useState } from 'react';

export function useAddTodoModal() {
  const [selectedColor, setSelectedColor] = useState('#3B82F6');

  return {
    selectedColor,
    setSelectedColor,
  };
}