import { message } from 'antd';

interface IShowSuccessParams {
  title: string;
  description: string;
}

export function useShowSuccess() {
  const showSuccess = ({ title, description }: IShowSuccessParams) => {
    message.success(`${title}: ${description}`, 2.5);
  };

  return { showSuccess };
}
