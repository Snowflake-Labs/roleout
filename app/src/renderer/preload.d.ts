import { Channels } from 'main/preload'

declare global {
  interface Window {
    electron: {
      ipcRenderer: {
        invoke(channel: Channels, ...args: unknown[]): Promise<unknown>;
        sendMessage(channel: Channels, args: unknown[]): void;
        on(
          channel: string,
          func: (...args: unknown[]) => void
        ): (() => void) | undefined;
        once(channel: string, func: (...args: unknown[]) => void): void;
      };
    };
    electronAPI: {
      openFile: () => Promise<string | null>
    }
  }
}

export {}
