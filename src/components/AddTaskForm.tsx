import React, { useState, useRef, useEffect } from 'react';
import { Modal, Form, Input, Button, DatePicker } from 'antd';
import dayjs from 'dayjs';
import type { CreateTaskPayload } from '../services/authService';
import ColorPickerBox from './ColorPickerBox';

interface TaskFormModalProps {
  visible: boolean;
  onCancel: () => void;
  onOk: (values: CreateTaskPayload) => void;
}

const colorOptions = [
  { hex: '#FF0202', name: 'RED', label: 'Urgent' },
  { hex: '#E81E63', name: 'PINK', label: 'High' },
  { hex: '#9B27AF', name: 'PURPLE', label: 'Important' },
  { hex: '#673AB6', name: 'DEEP PURPLE', label: 'Backlog' },
  { hex: '#3F51B4', name: 'INDIGO', label: 'Later' },
  { hex: '#2195F2', name: 'BLUE', label: 'Optional' },
  { hex: '#00BBD3', name: 'CYAN', label: 'Info' },
  { hex: '#009587', name: 'TEAL', label: 'Clean' },
  { hex: '#4CAE50', name: 'GREEN', label: 'Done' },
  { hex: '#8AC24A', name: 'LIGHT GREEN', label: 'Low' },
  { hex: '#CCDB39', name: 'LIME', label: 'Mid' },
  { hex: '#FEEA3B', name: 'YELLOW', label: 'Warning' },
  { hex: '#795548', name: 'BROWN', label: 'Idea' },
  { hex: '#9D9D9D', name: 'GRAY', label: 'Neutral' },
];

// Constante para los tamaños de los inputs (excepto description)
const inputSizeClass = 'w-[367px] h-[37px]';

const TaskFormModal: React.FC<TaskFormModalProps> = ({ visible, onCancel, onOk }) => {
  const [form] = Form.useForm();
  const [selectedColor, setSelectedColor] = useState(colorOptions[0]);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Obtener posición de la burbuja seleccionada
    const selectedIndex = colorOptions.findIndex(c => c.hex === selectedColor.hex);
    const bubble = gridRef.current?.children[selectedIndex] as HTMLElement;
    const container = gridRef.current?.getBoundingClientRect();

    if (bubble && container) {
      // const bubbleRect = bubble.getBoundingClientRect();
      // const left = bubbleRect.left - container.left + bubbleRect.width / 2 - 8;
      // setArrowLeft(left);
      // Código eliminado porque arrowLeft ya no se usa
    }
  }, [selectedColor]);

  const handleOk = () => {
    form
      .validateFields()
      .then(values => {
        form.resetFields();
        onOk({
          ...values,
          dueDate: values.dueDate ? dayjs(values.dueDate).toISOString() : null,
          category: selectedColor.hex,
        });
      })
      .catch(info => {
        console.log('Validate Failed:', info);
      });
  };

  const CustomCloseIcon = (
    <svg width="11" height="12" viewBox="0 0 11 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M3.944 6.048L0.256 0.431999H2.4C2.54933 0.431999 2.656 0.453333 2.72 0.495999C2.78933 0.533333 2.85067 0.597333 2.904 0.688L5.536 4.936C5.56267 4.86667 5.592 4.8 5.624 4.736C5.656 4.66667 5.69333 4.59733 5.736 4.528L8.144 0.728C8.26133 0.530666 8.41333 0.431999 8.6 0.431999H10.664L6.936 5.96L10.768 12H8.616C8.472 12 8.35467 11.9627 8.264 11.888C8.17867 11.8133 8.10667 11.728 8.048 11.632L5.368 7.2C5.34667 7.264 5.32267 7.32533 5.296 7.384C5.26933 7.43733 5.24267 7.488 5.216 7.536L2.648 11.632C2.58933 11.7227 2.51733 11.808 2.432 11.888C2.34667 11.9627 2.24 12 2.112 12H0.096L3.944 6.048Z"
        fill="#051F61"
      />
    </svg>
  );

  return (
    <Modal
      title="Create New Task"
      open={visible}
      onOk={handleOk}
      onCancel={onCancel}
      width={436}
      closeIcon={CustomCloseIcon}
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
      <Form form={form} layout="vertical" name="task_form" initialValues={{ remember: true }}>
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: 'Please enter the task title!' }]}
        >
          <Input style={{ width: '367px', height: '37px' }} />
        </Form.Item>

        <Form.Item name="dueDate" label="Due Date">
          <DatePicker className={inputSizeClass} placeholder="DD/MM/YYYY" />
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
    </Modal>
  );
};

export default TaskFormModal;
