export interface CsLogData {
  [key: string]: any;
  '@t': Date;
  '@mt': string;
  '@l'?: 'Verbose' | 'Debug' | 'Information' | 'Warning' | 'Error' | 'Fatal';
}
