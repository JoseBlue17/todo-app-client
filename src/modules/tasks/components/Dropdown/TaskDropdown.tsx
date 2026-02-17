import { Dropdown, Button } from 'antd';
import { TfiMenuAlt } from 'react-icons/tfi';
import type { MenuProps } from 'antd';

interface TaskDropdownProps {
  className?: string;
  iconClassName?: string;
  items: MenuProps['items'];
}

export default function TaskDropdown({
  className = '',
  iconClassName = '',
  items,
}: TaskDropdownProps) {
  return (
    <Dropdown menu={{ items }} placement="bottomRight" trigger={['click']} className={className}>
      <Button
        type="text"
        icon={<TfiMenuAlt className={iconClassName} />}
        className={`
          !flex items-center justify-center 
          !p-2 !border-0 !shadow-none 
          hover:!bg-teal-50 
          focus:!bg-teal-50
          ${iconClassName}
        `}
        aria-label="Menú"
      />
    </Dropdown>
  );
}
