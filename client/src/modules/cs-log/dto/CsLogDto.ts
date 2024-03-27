export interface CsLogDto {
  [key: string]: any;
  '@t': string;
  '@mt': string;
  '@l'?: 'Verbose' | 'Debug' | 'Information' | 'Warning' | 'Error' | 'Fatal';
}
