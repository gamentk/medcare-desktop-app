declare global {
  interface Window {
    electron: {
      ipcRenderer: {
        myPing(): void;
        callPython(): void;
        on(
          channel: string,
          func: (...args: unknown[]) => void
        ): (() => void) | undefined;
        once(channel: string, func: (...args: unknown[]) => void): void;
      };
    };
  }
}

export {};
