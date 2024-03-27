import { CsLog } from '../cs-log/entities/CsLog';
import { FileInfo } from '../file/FileInfo';

export interface AppState {
  loadedLogFilesInfo?: FileInfo[];
  csLogs?: CsLog[];
}
