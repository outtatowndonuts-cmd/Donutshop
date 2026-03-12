// src/debug.ts
// Debug utility for logging API and UI events. Set window.DEBUG_API = true in the console to enable.
export function debugLog(message: string, data?: any) {
  if (typeof window !== 'undefined' && (window as any).DEBUG_API) {
    if (data !== undefined) {
      // eslint-disable-next-line no-console
      console.log(`[DEBUG] ${message}:`, data);
    } else {
      // eslint-disable-next-line no-console
      console.log(`[DEBUG] ${message}`);
    }
  }
}
