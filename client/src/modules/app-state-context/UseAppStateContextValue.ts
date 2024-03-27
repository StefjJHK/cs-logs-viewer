import { AppState } from './AppState';

export type UseAppStateContextValue = [value: AppState, setValue: (value: AppState) => void];
