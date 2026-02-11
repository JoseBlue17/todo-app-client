import { Form, Input, DatePicker } from 'antd';
import type { FormInstance } from 'antd/es/form';
import ColorPickerBox from './color-picker-box';
import { cn } from '../helpers';

export interface ColorOption {
  hex: string;
  name: string;
  label: string;
}

export interface AddTodoFormProps {
  form: FormInstance;
  colorOptions: ColorOption[];
  selectedColor: ColorOption;
  setSelectedColor: (color: ColorOption) => void;
  inputSizeClass?: string;
}

const labelsStyle =
  'text-[#4A4A4A] font-lato font-semibold block mb-1 truncate max-w-full text-base sm:text-sm';

const AddTodoForm: React.FC<AddTodoFormProps> = ({
  form,
  colorOptions,
  selectedColor,
  setSelectedColor,
  inputSizeClass = 'w-[367px] h-[37px]',
}) => {
  return (
    <Form form={form} layout="vertical" name="add_todo_form" initialValues={{ remember: true }}>
      <Form.Item
        label={<span className={labelsStyle}>Task</span>}
        name="task"
        required={false}
        rules={[{ required: true, message: 'Please enter the task title!' }]}
      >
        <Input className={cn('w-[367px] h-[37px]')} />
      </Form.Item>

      <Form.Item
        name="dueDate"
        label={<span className={labelsStyle}>Due Date</span>}
        className={cn('w-full max-w-[367px]')}
      >
        <DatePicker className={cn(inputSizeClass, 'w-full')} placeholder="DD/MM/YYYY" />
      </Form.Item>

      <Form.Item
        name="description"
        label={
          <span className={labelsStyle}>
            Description<span className="p-0.5">(opcional)</span>
          </span>
        }
      >
        <Input.TextArea className={cn('w-[367px] h-[63px]')} style={{ resize: 'none' }} />
      </Form.Item>

      <Form.Item label={<span className={labelsStyle}>Choose color</span>}>
        <div
          className={cn(
            'border border-[#CBD5E1] rounded-md px-4 flex items-center gap-3 bg-white select-none',
            inputSizeClass,
            'overflow-x-auto max-w-full',
          )}
        >
          <div className="w-5 h-5 rounded" style={{ backgroundColor: selectedColor.hex }}></div>
          <span className={cn('text-sm font-normal text-[#ACAAAA]')}>
            {selectedColor.name} {selectedColor.hex.replace('#', '')} {selectedColor.label}
          </span>
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
