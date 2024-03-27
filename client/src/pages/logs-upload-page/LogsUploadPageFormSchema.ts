import * as yup from 'yup';
import { LogsUploadPageFormData } from './LogsUploadPageFormData';

export const logsUploadPageFormSchema: yup.Schema<LogsUploadPageFormData> = yup.object({
  files: yup.array().required().min(1, 'At least one file is required')
});
