import { ReactElement, SyntheticEvent } from 'react';
import { useField, useFormikContext } from 'formik';
import { FormGroup } from './FormGroup';
import FormErrorMessage from 'rsuite/FormErrorMessage';
import FormControlLabel from 'rsuite/FormControlLabel';
import { FieldProps } from './FieldProps';
import FormControl from 'rsuite/FormControl';

export interface InputProps extends FieldProps {
  label?: string;
  placeholder?: string;
}

export function TextField({ name, label, disabled, placeholder, className }: InputProps): ReactElement {
  const { errors: formError } = useFormikContext();
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [{ value, onChange, ...field }] = useField({ name, placeholder });

  const error = (formError as Record<string, string>)[name];
  const onChangeWrapper = (_: string, e: SyntheticEvent<HTMLInputElement>) => {
    onChange(e);
  };
  return (
    <FormGroup className={className}>
      {label && <FormControlLabel>{label}</FormControlLabel>}
      <FormControl disabled={disabled} onChange={onChangeWrapper} {...field} />
      <FormErrorMessage show={!!error} placement="topStart">
        {error}
      </FormErrorMessage>
    </FormGroup>
  );
}
