export const logger = {
  info: (message: string) => console.log(`[INFO] ${message}`),
  error: (message: string, err?: any) => console.error(`[ERROR] ${message}`, err),
  warn: (message: string) => console.warn(`[WARN] ${message}`)
};