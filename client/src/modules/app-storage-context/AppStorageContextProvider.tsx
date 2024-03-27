import { ReactElement, ReactNode, useMemo } from 'react';
import { useStorage } from '../storage/UseStorage';
import { AppStorage, storageVersion } from './AppStorage';
import { AppStorageContext } from './AppStorageContext';
import { AppStorageContextValue } from './AppStorageContextValue';

const storageKey = 'app-storage-context';

export interface AppStorageContextProviderProps {
  children?: ReactNode;
}

export function AppStorageContextProvider({ children }: AppStorageContextProviderProps): ReactElement {
  const { value, onLoaded, setValue } = useStorage<AppStorage>(storageKey, { storageVersion });
  const contextValue: AppStorageContextValue = useMemo(() => {
    let storageValue: AppStorage | null = onLoaded ? value : null;

    if (value?.storageVersion !== storageVersion) {
      const value: AppStorage = { storageVersion };

      storageValue = null;
      setValue(value);
    }

    return [storageValue, setValue];
  }, [onLoaded, setValue, value]);

  return <AppStorageContext.Provider value={contextValue}>{onLoaded && children}</AppStorageContext.Provider>;
}
