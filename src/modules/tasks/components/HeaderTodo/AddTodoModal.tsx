import { Form } from '@tanstack/react-query';
import type { ITodo } from '@/interfaces';

interface IAddTodoModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (todo: ITodo) => void;
  form: any;
  selectedColor: string;
  setSelectedColor: (color: string) => void;
}

export default function AddTodoModal({
  visible,
  onClose,
  onSubmit,
  form,
  selectedColor,
  setSelectedColor,
}: IAddTodoModalProps) {
  if (!visible) return null;

  const handleSubmit = (values: any) => {
    let dueDate = undefined;
    
    if (values.dueDate) {
      if (values.dueTime) {
        // Combine date and time
        const [hours, minutes] = values.dueTime.split(':');
        const combinedDate = new Date(values.dueDate);
        combinedDate.setHours(parseInt(hours), parseInt(minutes), 0, 0);
        dueDate = combinedDate;
      } else {
        // Use current time if no time specified
        const combinedDate = new Date(values.dueDate);
        combinedDate.setHours(9, 0, 0, 0); // Default to 9:00 AM
        dueDate = combinedDate;
      }
    }

    onSubmit({
      id: Date.now().toString(),
      title: values.title,
      description: values.description,
      category: values.category,
      dueDate,
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    form.resetFields();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Nueva Tarea</h2>
        
        <Form
          form={form}
          onFinish={handleSubmit}
          layout="vertical"
        >
          <Form.Item
            name="title"
            rules={[{ required: true, message: 'El título es requerido' }]}
          >
            <input
              type="text"
              placeholder="Título de la tarea"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </Form.Item>

          <Form.Item name="description">
            <textarea
              placeholder="Descripción (opcional)"
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </Form.Item>

          <Form.Item name="category">
            <input
              type="text"
              placeholder="Categoría (opcional)"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </Form.Item>

          <Form.Item name="dueDate">
            <input
              type="date"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </Form.Item>

          <Form.Item name="dueTime">
            <input
              type="time"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              defaultValue="09:00"
            />
          </Form.Item>

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
            >
              Crear Tarea
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}