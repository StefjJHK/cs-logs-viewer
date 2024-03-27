import { AppState } from './AppState';
import { ReactElement, ReactNode, useMemo } from 'react';
import { useAppStorageContext } from '../app-storage-context/UseAppStorageContext';
import { UseAppStateContextValue } from './UseAppStateContextValue';
import { AppStateContext } from './AppStateContext';
import { AppStateContextMapper } from './AppStateContextMapper';

export interface AppStateContextProps {
  children?: ReactNode;
}

export function AppStateContextProvider({ children }: AppStateContextProps): ReactElement {
  const [appStorage, setAppStorage] = useAppStorageContext();
  const contextValue: UseAppStateContextValue = useMemo(() => {
    const appState = AppStateContextMapper.MapAppStorageToAppState(appStorage);
    const setAppState = (value: AppState) => {
      const appStorage = AppStateContextMapper.MapAppStateToAppStorage(value);

      setAppStorage(appStorage);
    };

    return [appState, setAppState];
  }, [appStorage, setAppStorage]);

  return <AppStateContext.Provider value={contextValue}>{children}</AppStateContext.Provider>;
}
