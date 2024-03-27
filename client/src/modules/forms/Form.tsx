import React, { FormEvent, ReactElement, ReactNode } from 'react';
import { Formik, FormikValues } from 'formik';
import { Schema } from 'yup';
import { Form as RsForm } from 'rsuite';
import styled from 'styled-components';

export interface FormProps<TValue extends FormikValues, TSchema extends Schema<TValue>> {
  defaultValue: TValue;
  schema: TSchema;
  onSubmit(value: TValue): void;
  onChange?(value: TValue): void;
  disabled?: boolean;
  fluid?: boolean;
  className?: string;
  children?: ReactNode;
}

const StyledRsForm = styled(RsForm)`
  display: flex;
  flex-direction: column;
`;

export function Form<TValue extends FormikValues, TSchema extends Schema<TValue>>({
  defaultValue,
  schema,
  onSubmit,
  onChange,
  disabled,
  fluid,
  className,
  children
}: FormProps<TValue, TSchema>): ReactElement {
  return (
    <Formik initialValues={defaultValue} onSubmit={onSubmit} validationSchema={schema}>
      {({ handleSubmit }) => {
        const onSubmitWrapper = (_: boolean, e: FormEvent<HTMLFormElement>) => {
          handleSubmit(e);
        };

        //eslint-disable-next-line @typescript-eslint/no-explicit-any
        const onChangeWrapper = (data: any) => {
          if (onChange) {
            onChange(data);
          }
        };

        return (
          <StyledRsForm
            onSubmit={onSubmitWrapper}
            onChange={onChangeWrapper}
            disabled={disabled}
            className={className}
            fluid={fluid === undefined ? true : fluid}>
            {children}
          </StyledRsForm>
        );
      }}
    </Formik>
  );
}
