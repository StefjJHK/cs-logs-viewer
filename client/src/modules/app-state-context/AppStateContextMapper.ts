import { AppStorage, storageVersion } from '../app-storage-context/AppStorage';
import { AppState } from './AppState';

export class AppStateContextMapper {
  static MapAppStorageToAppState(value: AppStorage): AppState {
    return {
      ...value
    };
  }

  static MapAppStateToAppStorage(value: AppState): AppStorage {
    return {
      ...value,
      storageVersion
    };
  }
}
