import { ReactElement } from 'react';
import styled from 'styled-components';
import { Form } from '../../modules/forms/Form';
import { logsUploadPageFormSchema } from './LogsUploadPageFormSchema';
import { LogsUploadPageFormData } from './LogsUploadPageFormData';
import { Button } from 'rsuite';
import { FileField, FileFieldType } from '../../modules/forms/FileField';
import { useNavigate } from 'react-router-dom';
import { useAppStateContext } from '../../modules/app-state-context/UseAppStateContext';
import { PageRoutes } from '../../modules/navigation/Routes';
import { CsLogConverter } from '../../modules/cs-log/CsLogConverter';
import { useErrorBoundary, withErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from '../../modules/error-boundary/ErrorFallback';

const defaultFormData: LogsUploadPageFormData = {
  files: []
};

const StyledForm = styled(Form)`
  display: flex;
  flex-grow: 1;
`;
const StyledFileField = styled(FileField)`
  flex-grow: 1;
`;
const StyledButton = styled(Button)`
  width: 250px;
  height: 50px;
  margin-top: 10px;
  align-self: flex-end;
`;

export const LogsUploadPage = withErrorBoundary(
  function LogsUploadPage(): ReactElement {
    const [appContext, setAppContext] = useAppStateContext();
    const navigate = useNavigate();
    const { showBoundary } = useErrorBoundary();

    const onSubmit = ({ files }: LogsUploadPageFormData) => {
      CsLogConverter.FilesToCsLogs(files)
        .then((csLogs) => {
          setAppContext({
            ...appContext,
            loadedLogFilesInfo: files.map((file) => ({
              name: file.name
            })),
            csLogs
          });
          navigate(PageRoutes.LogsView);
        })
        .catch((error) => showBoundary(error));
    };

    return (
      <StyledForm defaultValue={defaultFormData} schema={logsUploadPageFormSchema} onSubmit={onSubmit}>
        <StyledFileField
          label="Select log files"
          name="files"
          fileTypes={['application/JSON']}
          type={FileFieldType.Area}
          fileListVisible></StyledFileField>
        <StyledButton type="submit">Submit</StyledButton>
      </StyledForm>
    );
  },
  { FallbackComponent: ErrorFallback }
);
