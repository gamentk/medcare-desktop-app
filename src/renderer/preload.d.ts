declare global {
  interface Window {
    electron: {
      ipcRenderer: {
        myPing(): void;
        callPython(slot: number): void;
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
