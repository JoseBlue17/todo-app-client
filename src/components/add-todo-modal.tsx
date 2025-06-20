import React from 'react';
import { Modal, Button } from 'antd';

import AddTodoForm from './add-todo-form';
import ModalCloseIcon from './modal-close-icon';
import { colorOptions } from './color-options';
import type { CreateTodoData } from '../types/todo.types';


import type { FormInstance } from 'antd/es/form';

interface AddTodoModalProps {
  visible: boolean;
  onCancel: () => void;
  onOk: (values: CreateTodoData) => void;
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
      .then((values: { title?: string; description?: string; dueDate?: unknown }) => {
        form.resetFields();
        const dueDateValue =
          values.dueDate && typeof values.dueDate === 'object' && 'toDate' in values.dueDate
            ? (values.dueDate as { toDate: () => Date }).toDate()
            : undefined;
        const todo: CreateTodoData = {
          title: values.title || '',
          description: values.description || '',
          dueDate: dueDateValue,
          category: selectedColor.hex,
        };
        onOk(todo);
      })
      .catch((info: unknown) => {
        console.log('Validate Failed:', info);
      });
  };

  return (
    <Modal
      title="Create New Task"
      open={visible}
      onOk={handleOk}
      onCancel={onCancel}
      width={436}
      closeIcon={<ModalCloseIcon />}
      footer={[
        <div className="flex " key="footer">
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
      <AddTodoForm
        form={form}
        colorOptions={colorOptions}
        selectedColor={selectedColor}
        setSelectedColor={setSelectedColor}
        inputSizeClass={inputSizeClass}
      />
    </Modal>
  );
};

export default AddTodoModal;
