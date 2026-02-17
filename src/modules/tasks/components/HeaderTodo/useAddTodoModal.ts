import { useState } from 'react';

export function useAddTodoModal() {
  const [selectedColor, setSelectedColor] = useState('#2195F2');

  return {
    selectedColor,
    setSelectedColor,
  };
}
