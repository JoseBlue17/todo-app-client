import type { MenuProps } from 'antd';
import { 
  FiSettings, 
  FiUser, 
  FiBarChart2, 
  FiDownload, 
  FiLogOut 
} from 'react-icons/fi';

export const getMenuItems = (
  handleLogout: () => void,
  setShowSettings: (show: boolean) => void
): MenuProps['items'] => [
  {
    key: 'settings',
    label: 'Configuración',
    icon: <FiSettings className="w-4 h-4" />,
    onClick: () => setShowSettings(true),
  },
  {
    key: 'profile',
    label: 'Perfil',
    icon: <FiUser className="w-4 h-4" />,
    onClick: () => {
      console.log('Navegar a perfil');
    },
  },
  {
    key: 'statistics',
    label: 'Estadísticas',
    icon: <FiBarChart2 className="w-4 h-4" />,
    onClick: () => {
      console.log('Mostrar estadísticas');
    },
  },
  {
    key: 'export',
    label: 'Exportar tareas',
    icon: <FiDownload className="w-4 h-4" />,
    onClick: () => {
      console.log('Exportar tareas');
    },
  },
  {
    type: 'divider',
  },
  {
    key: 'logout',
    label: 'Cerrar sesión',
    icon: <FiLogOut className="w-4 h-4 text-red-500" />,
    onClick: handleLogout,
    danger: true,
  },
];