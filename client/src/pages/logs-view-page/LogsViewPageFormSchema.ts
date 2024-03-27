import * as yup from 'yup';
import { LogsViewPageFormData } from './LogsViewPageFormData';

export const logsViewPageFormSchema: yup.Schema<LogsViewPageFormData> = yup.object({
  filter: yup.string().test('json', 'Filter must have JSON format', (value) => {
    if (value === undefined) {
      return true;
    }

    try {
      JSON.parse(value);

      return true;
    } catch (error) {
      return false;
    }
  })
});
