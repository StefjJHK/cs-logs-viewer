import { createContext } from 'react';
import { AppStorageContextValue } from './AppStorageContextValue';

export const AppStorageContext = createContext<AppStorageContextValue | null>(null);
