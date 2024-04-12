import { ReactElement, ReactNode, useState } from 'react';
import { RadioGroup as RsRadioGroup } from 'rsuite';
import { FieldProps } from './FieldProps';
import styled from 'styled-components';
import { useField } from 'formik';

export interface RadioGroupProps extends FieldProps {
  bordered?: boolean;
  inline?: boolean;
  children: ReactNode;
  appearance?: 'default' | 'picker';
}

const StyledRsRadioGroup = styled(RsRadioGroup)<{ $bordered?: boolean }>`
  ${(props) => !props.$bordered && 'border: none !important;'}
`;

export function FieldGroup({ name, appearance, bordered, disabled, inline, className, children }: RadioGroupProps): ReactElement {
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [{ value, ...field }] = useField({ name });
  const [defaultValue] = useState(() => value);

  return (
    <StyledRsRadioGroup
      defaultValue={defaultValue}
      className={className}
      appearance={appearance}
      disabled={disabled}
      inline={inline}
      bordered={bordered}>
      {children}
    </StyledRsRadioGroup>
  );
}
