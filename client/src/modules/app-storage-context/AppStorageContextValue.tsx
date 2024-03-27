import { AppStorage } from './AppStorage';

export type AppStorageContextValue = [value: AppStorage | null, setValue: (value: AppStorage) => void];
