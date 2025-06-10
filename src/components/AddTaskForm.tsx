import React from 'react';
import { Modal, Form, Input, Button, DatePicker, Select } from 'antd';
import dayjs from 'dayjs';
import type { CreateTaskPayload } from '../services/authService';

const { Option } = Select;

interface TaskFormModalProps {
  visible: boolean;
  onCancel: () => void;
  onOk: (values: CreateTaskPayload) => void;
}

const colors = [
  '#FF0202', '#E81E63', '#9B27AF', '#673AB6', '#3F51B4', '#2195F2',
  '#00BBD3', '#009587', '#4CAE50', '#8AC24A', '#CCDB39', '#FEEA3B',
  '#795548', '#9D9D9D',
];

const TaskFormModal: React.FC<TaskFormModalProps> = ({ visible, onCancel, onOk }) => {
  const [form] = Form.useForm();

  const handleOk = () => {
    form.validateFields()
      .then(values => {
        form.resetFields();
        onOk({
          ...values,
          dueDate: values.dueDate ? dayjs(values.dueDate).toISOString() : null,
        });
      })
      .catch(info => {
        console.log('Validate Failed:', info);
      });
  };

  return (
    <Modal
      title="Crear Nueva Tarea"
      visible={visible}
      onOk={handleOk}
      onCancel={onCancel}
      footer={[
        <Button key="back" onClick={onCancel}>
          Cancelar
        </Button>,
        <Button key="submit" type="primary" onClick={handleOk}>
          Crear
        </Button>,
      ]}
    >
      <Form
        form={form}
        layout="vertical"
        name="task_form"
        initialValues={{ remember: true }}
      >
        <Form.Item
          name="title"
          label="Título"
          rules={[{ required: true, message: '¡Por favor, introduce el título de la tarea!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="Descripción"
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          name="dueDate"
          label="Fecha de Vencimiento"
        >
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          name="category"
          label="Categoría (Color)"
        >
          <Select placeholder="Selecciona un color">
            {colors.map(color => (
              <Option key={color} value={color}>
                <span style={{ display: 'inline-block', width: '20px', height: '20px', backgroundColor: color, marginRight: '8px', borderRadius: '4px' }}></span>
                {color}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default TaskFormModal;
