import { useAppToast } from './useToast';
import { useMemo } from 'react';

export interface AxiosResponseError {
  response?: {
    status?: number;
    data?: {
      message?: string;
      code?: string;
    };
  };
  message?: string;
}

export function useShowError() {
  const { triggerToast } = useAppToast();

  const { byDomainCode, byHttpCode } = useMemo(
    () => ({
      byDomainCode: {
        INSUFFICIENT_CREDENTIALS_PROVIDED: 'Credenciales insuficientes',
        INVALID_CREDENTIALS: 'Contraseña actual incorrecta',
        SESSION_TOKEN_EXPIRED: 'Token de sesión ha expirado',
        TOKEN_INVALID: 'El token es inválido',
        USER_ALREADY_REGISTERED: 'Usuario ya registrado',
      },
      byHttpCode: {
        400: 'Revisa los campos',
        401: 'No autorizado',
        403: 'No tienes permiso para realizar esta acción',
        404: 'Recurso no encontrado',
        500: 'Error interno del servidor',
        502: 'Error en la pasarela',
        503: 'Servicio no disponible',
        504: 'Tiempo de espera agotado en la pasarela',
      },
    }),
    [],
  );

  const showError = (error: AxiosResponseError) => {
    const { response } = error;
    const { data, status: statusCode } = response || {};
    const errorCode = data?.code;

    let title: string | undefined;
    if (typeof errorCode === 'string') {
      title = byDomainCode[errorCode as keyof typeof byDomainCode];
    } else if (statusCode) {
      title = byHttpCode[statusCode as keyof typeof byHttpCode];
    }

    if (title) {
      triggerToast({ title, type: 'error' });
      return;
    }

    triggerToast({
      title: 'Error',
      description: error.message || 'Ocurrió un error inesperado',
      type: 'error',
    });
  };

  return { showError };
}