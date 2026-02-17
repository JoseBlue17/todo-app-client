import { useAppToast } from './useToast';

interface IShowSuccessParams {
  title: string;
  description?: string;
}

export function useShowSuccess() {
  const { triggerToast } = useAppToast();

  const showSuccess = ({ title, description }: IShowSuccessParams) => {
    triggerToast({ title, description, type: 'success' });
  };

  return { showSuccess };
}