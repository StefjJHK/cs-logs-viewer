import { useContext } from 'react';
import { AppStateContext } from './AppStateContext';
import { UseAppStateContextValue } from './UseAppStateContextValue';

export function useAppStateContext(): UseAppStateContextValue {
  const appStateContext = useContext(AppStateContext);

  if (!appStateContext) {
    throw new Error('useAppStateContext context has to be used outside of its provider');
  }

  return appStateContext;
}
