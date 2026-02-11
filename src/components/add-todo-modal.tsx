import React from 'react';
import { Modal, Button } from 'antd';
import dayjs from 'dayjs';
import AddTodoForm from './add-todo-form';
import ModalCloseIcon from './modal-close-icon';
import { colorOptions } from './color-options';
import type { Todo } from '../types/todo.types';
import type { FormInstance } from 'antd/es/form';

interface AddTodoModalProps {
  visible: boolean;
  onCancel: () => void;
  onOk: (values: Todo) => void;
  form: FormInstance;
  selectedColor: (typeof colorOptions)[0];
  setSelectedColor: (color: (typeof colorOptions)[0]) => void;
}

const inputSizeClass = 'w-[367px] h-[37px]';

const AddTodoModal: React.FC<AddTodoModalProps> = ({
  visible,
  onCancel,
  onOk,
  form,
  selectedColor,
  setSelectedColor,
}) => {
  const handleOk = () => {
    form
      .validateFields()
      .then((values: { task?: string; description?: string; dueDate?: unknown }) => {
        form.resetFields();
        const dueDateValue =
          values.dueDate && typeof values.dueDate === 'object' && 'toDate' in values.dueDate
            ? dayjs((values.dueDate as { toDate: () => Date }).toDate()).toISOString()
            : '';
        const todo: Todo = {
          _id: '',
          title: values.task || '',
          description: values.description || '',
          dueDate: dueDateValue,
          category: selectedColor.hex,
          completed: false,
        };
        onOk(todo);
      })
      .catch((info: unknown) => {
        console.log('Validate Failed:', info);
      });
  };

  return (
    <Modal
      title={
        <span
          className="block text-[16px] text-center font-semibold select-none"
          style={{ resize: 'none', overflow: 'hidden' }}
        >
          Add Task
        </span>
      }
      open={visible}
      onOk={handleOk}
      onCancel={onCancel}
      width={436}
      closeIcon={<ModalCloseIcon />}
      footer={[
        <div className="flex px-2.5" key="footer">
          <Button
            type="primary"
            onClick={handleOk}
            style={{ backgroundColor: '#A779CA', border: 'none', color: 'white' }}
            className="w-[368px] h-[37px] text-base font-semibold rounded"
          >
            Create
          </Button>
        </div>,
      ]}
    >
      <div className="px-2.5">
        <AddTodoForm
          form={form}
          colorOptions={colorOptions}
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
          inputSizeClass={inputSizeClass}
        />
      </div>
    </Modal>
  );
};

export default AddTodoModal;
