import { CsLog } from '../cs-log/entities/CsLog';
import { FileInfo } from '../file/FileInfo';

export const storageVersion = 1.0;

export interface AppStorage {
  loadedLogFilesInfo?: FileInfo[];
  csLogs?: CsLog[];
  storageVersion: number;
}
