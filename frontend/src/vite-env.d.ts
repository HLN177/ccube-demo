/// <reference types="vite/client" />


declare global {
  interface Window {
    ComplyCube: {
      mount: (options: {
        token: string;
        language?: string;
        containerId?: string;
        useModal?: boolean;
        disableClientAnalytics?: boolean;
        stages?: Array<string | object>;
        onComplete?: (data: any) => void;
        onModalClose?: () => void;
        onError?: (data: any) => void;
        onExit?: () => void;
      }) => any;
    };
  }
}

export {};