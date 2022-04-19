declare global {
  interface Window {
    electron: {
      ipcRenderer: {
        myPing(): void;
        callPython(dispatch: { action: string, payload: string }): void;
        callTTS(message: any): void;
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
