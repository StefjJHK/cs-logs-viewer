import { UseAppStorageContextValue } from './UseAppStorageContextValue';
import { useContext } from 'react';
import { AppStorageContext } from './AppStorageContext';

export function useAppStorageContext(): UseAppStorageContextValue {
  const context = useContext(AppStorageContext);

  if (!context) {
    throw new Error('useAppStorageContext context has to be used outside of its provider');
  }

  //eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return [context[0]!, context[1]];
}
