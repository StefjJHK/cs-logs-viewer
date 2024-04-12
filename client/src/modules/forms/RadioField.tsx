import { ReactElement, ReactNode } from 'react';
import { useField } from 'formik';
import { Form, Radio } from 'rsuite';
import { FieldProps } from './FieldProps';
import { FormGroup } from './FormGroup';
import styled from 'styled-components';

export interface RadioFieldProps extends FieldProps {
  name: string;
  value: string;
  label: string;
  icon?: ReactNode;
}

const StyledFormControlContent = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;

  .icon {
    padding-right: 5px;
  }
`;

export function RadioField({ name, label, value, disabled, className, icon }: RadioFieldProps): ReactElement {
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [{ value: fieldValue, onChange, ...field }] = useField({ name });

  return (
    <FormGroup className={className}>
      <Form.Control disabled={disabled} onChange={onChange} value={value} name={name} accepter={Radio}>
        <StyledFormControlContent>
          {icon && <div className="icon-wrapper">{icon}</div>}
          {label}
        </StyledFormControlContent>
      </Form.Control>
    </FormGroup>
  );
}
