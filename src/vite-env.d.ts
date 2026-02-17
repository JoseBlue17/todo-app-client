/// <reference types="vite/client" />

interface ShowToastOptions {
  type?: 'info' | 'success' | 'warning' | 'error' | 'default';
}

declare const showToast: (message: string, options?: ShowToastOptions) => void;
