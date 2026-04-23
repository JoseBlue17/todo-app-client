import React, { useEffect } from 'react';
import { Modal, Button, Form } from 'antd';
import dayjs from 'dayjs';
import { useState } from 'react';
import AddTodoForm from './add-todo-form';
import ModalCloseIcon from './modal-close-icon';
import { colorOptions } from './color-options';
import type { Todo, ICreateTodoInput } from '../interfaces';

interface EditTodoModalProps {
  todo: Todo | null;
  visible: boolean;
  onCancel: () => void;
  onOk: (id: string, payload: ICreateTodoInput) => void;
  isLoading?: boolean;
}

const EditTodoModal: React.FC<EditTodoModalProps> = ({
  todo,
  visible,
  onCancel,
  onOk,
  isLoading,
}) => {
  const [form] = Form.useForm();
  const [selectedColor, setSelectedColor] = useState(colorOptions[0]);

  useEffect(() => {
    if (visible && todo) {
      const match = colorOptions.find(c => c.hex === todo.category);
      if (match) setSelectedColor(match);

      form.setFieldsValue({
        task: todo.title,
        description: todo.description,
        dueDate: todo.dueDate ? dayjs(todo.dueDate) : undefined,
      });
    }
  }, [visible, todo, form]);

  const handleOk = () => {
    form
      .validateFields()
      .then((values: { task?: string; description?: string; dueDate?: unknown }) => {
        const dueDateValue =
          values.dueDate && typeof values.dueDate === 'object' && 'toDate' in values.dueDate
            ? dayjs((values.dueDate as { toDate: () => Date }).toDate()).toISOString()
            : undefined;

        onOk(todo!._id, {
          title: values.task || '',
          description: values.description,
          dueDate: dueDateValue ? new Date(dueDateValue) : undefined,
          category: selectedColor.hex,
        });
      })
      .catch(() => {});
  };

  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };

  return (
    <Modal
      title={
        <span className="block text-[16px] text-center font-semibold select-none">Edit Task</span>
      }
      open={visible}
      onCancel={handleCancel}
      width={436}
      closeIcon={<ModalCloseIcon />}
      footer={[
        <div className="flex px-2.5" key="footer">
          <Button
            type="primary"
            onClick={handleOk}
            loading={isLoading}
            disabled={isLoading}
            style={{ backgroundColor: '#A779CA', border: 'none', color: 'white' }}
            className="w-[368px] h-[37px] text-base font-semibold rounded"
          >
            Save Changes
          </Button>
        </div>,
      ]}
    >
      <AddTodoForm
        form={form}
        colorOptions={colorOptions}
        selectedColor={selectedColor}
        setSelectedColor={setSelectedColor}
      />
    </Modal>
  );
};

export default EditTodoModal;
