import { createContext } from 'react';
import { UseAppStateContextValue } from './UseAppStateContextValue';

export const AppStateContext = createContext<UseAppStateContextValue | null>(null);
