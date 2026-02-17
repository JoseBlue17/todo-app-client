import { useToast } from './use-toast';

interface ToastOptions {
  title: string;
  description?: string;
  type?: 'info' | 'success' | 'warning' | 'error' | 'default';
}

export const useAppToast = () => {
  const { showToast } = useToast();

  const triggerToast = ({ title, description, type = 'error' }: ToastOptions) => {
    const message = description ? `${title}: ${description}` : title;
    const toastType = type === 'default' ? 'info' : type;
    showToast(message, toastType);
  };

  return { triggerToast };
};