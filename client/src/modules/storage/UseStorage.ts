import { useCallback, useEffect, useState } from 'react';
import localForage from 'localforage';

export interface UseStorageValue<TValue> {
  onLoaded: boolean;
  value: TValue | null;
  setValue: (value: TValue) => void;
  removeValue: (value: TValue) => void;
}

export function useStorage<TValue>(key: string, initialValue: TValue): UseStorageValue<TValue> {
  const [onLoaded, setOnLoaded] = useState<boolean>(() => false);
  const [storedValue, setStoredValue] = useState<TValue>(initialValue);

  useEffect(() => {
    const asyncSet = async () => {
      const value: TValue | null = await localForage.getItem(key);

      setStoredValue(value == null ? initialValue : value);
      setOnLoaded(true);
    };

    asyncSet();
  }, []);

  const setValue = useCallback(
    (value: TValue) => {
      const asyncSet = async (value: TValue) => {
        setStoredValue(value);

        await localForage.setItem(key, value).then(() => console.log(key, value));
      };

      asyncSet(value);
    },
    [key]
  );

  const removeValue = useCallback(() => {
    const remove = async () => {
      setStoredValue(initialValue);

      await localForage.removeItem(key);
    };

    remove();
  }, [key]);

  return { value: storedValue, onLoaded, setValue, removeValue };
}
