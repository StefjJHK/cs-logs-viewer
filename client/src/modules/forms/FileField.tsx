import { ChangeEvent, ReactElement, ReactNode, useCallback, useMemo } from 'react';
import { FieldInputProps, FormikContextType, useField, useFormikContext } from 'formik';
import { FieldProps } from './FieldProps';
import FormControlLabel from 'rsuite/FormControlLabel';
import { Accept, useDropzone } from 'react-dropzone';
import FormControl from 'rsuite/FormControl';
import styled from 'styled-components';
import { Stack, Tag } from 'rsuite';
import { Theme, useTheme } from '../theme/useTheme';
import FormErrorMessage from 'rsuite/FormErrorMessage';
import { FormGroup } from './FormGroup';

export enum FileFieldType {
  Default,
  Area
}

export interface FileFieldProps extends FieldProps {
  fileListVisible?: boolean;
  type?: FileFieldType;
  fileTypes?: string[];
  draggable?: boolean;
  disabled?: boolean;
  multiple?: boolean;
  children?: ReactNode;
}

interface FieldPartialProps {
  props: Omit<FileFieldProps, 'className' | 'label' | 'type'>;
  formContext: FormikContextType<unknown>;
  field: FieldInputProps<File[]>;
}

const StyledFormGroup = styled(FormGroup)`
  display: flex;
  flex-direction: column;
`;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function DefaultFileInputField({ field: { name, value, onChange, ...fieldRest }, props: { fileTypes } }: FieldPartialProps): ReactElement {
  const accept = useMemo(() => fileTypes?.join(','), [fileTypes]);
  const onChangeWrapper = (_: string, e: ChangeEvent<HTMLInputElement>) => {
    onChange(e);
  };

  return <FormControl type="file" name={name} onChange={onChangeWrapper} {...fieldRest} accept={accept}></FormControl>;
}

const StyledAreaInputContainer = styled.div<{
  $isValidationError: boolean;
  $isFocused: boolean;
  $isDragAccept: boolean;
  $isDragReject: boolean;
  $theme: Theme;
}>`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 5px;

  .content {
    display: flex;
    flex-grow: 1;
    border-width: 2px;
    border-radius: 5px;
    border-style: dashed;
    background-color: ${(props) => (props.$theme === Theme.Dark ? 'var(--rs-gray-800)' : '(var--rs-gray-0)')};
    color: ${(props) => {
      if (props.$isValidationError) {
        return 'var(--rs-red-500)';
      }

      return props.$theme === Theme.Dark ? '(var--rs-gray-0)' : 'var(--rs-gray-800)';
    }};
    cursor: pointer;
    outline: none;
    transition: border 0.24s ease-in-out;

    &_text {
      align-self: center;
      text-align: center;
    }
  }
`;

function AreaFileInputField({
  formContext: { errors: formErrors, setFieldValue },
  field: { name, value, onChange, ...fieldProps },
  props: { fileTypes }
}: FieldPartialProps): ReactElement {
  const onDrop = useCallback((files: Blob[]) => {
    setFieldValue(name, files, true);
  }, []);

  const accept: Accept = {};
  fileTypes?.forEach((fileType) => (accept[fileType] = []));

  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } = useDropzone({
    onDrop,
    accept: fileTypes ? accept : undefined
  });
  const theme = useTheme();

  const errors = (formErrors as Record<string, string>)[name];
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { value: dropValue, onChange: DropOnChange, ...dropProps } = getInputProps();

  return (
    <StyledAreaInputContainer
      $isFocused={isFocused}
      $isDragAccept={isDragAccept}
      $isDragReject={isDragReject}
      $theme={theme}
      $isValidationError={!!errors}>
      <div className="content" {...getRootProps()}>
        <input name={name} onChange={onChange} {...fieldProps} {...dropProps} />
        <p className="content_text">Drag and drop files or click to select files</p>
      </div>
      <Stack wrap spacing={6}>
        {value && value.map((file: File) => <Tag key={file.name}>{file.name}</Tag>)}
      </Stack>
    </StyledAreaInputContainer>
  );
}

export function FileField({ className, label, type, ...rest }: FileFieldProps): ReactElement {
  const formContext = useFormikContext();
  const [field] = useField({ name: rest.name });

  const errors = (formContext.errors as Record<string, string>)[field.name];

  return (
    <StyledFormGroup className={className}>
      {label && <FormControlLabel>{label}</FormControlLabel>}
      {type === FileFieldType.Default && <DefaultFileInputField formContext={formContext} field={field} props={rest} />}
      {type === FileFieldType.Area && <AreaFileInputField formContext={formContext} field={field} props={rest} />}
      <FormErrorMessage show={!!errors} placement="topStart">
        {errors}
      </FormErrorMessage>
    </StyledFormGroup>
  );
}
