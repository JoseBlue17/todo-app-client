import { message } from 'antd';

export interface AxiosResponseError {
  response?: {
    status?: number;
    data?: {
      message?: string;
    };
  };
  message?: string;
}

export function useShowError() {
  const showError = (error: AxiosResponseError) => {
    let errorMessage = 'Ocurrió un error inesperado';

    if (error.response?.data?.message) {
      errorMessage = error.response.data.message;
    } else if (error.message) {
      errorMessage = error.message;
    }

    message.error({
      content: errorMessage,
      duration: 3,
    });
  };

  return { showError };
}
