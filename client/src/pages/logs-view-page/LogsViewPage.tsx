import { ReactElement, useMemo, useState } from 'react';
import { Form } from '../../modules/forms/Form';
import { TextField } from '../../modules/forms/TextField';
import { LogsViewPageFormData } from './LogsViewPageFormData';
import { logsViewPageFormSchema } from './LogsViewPageFormSchema';
import { IconButton, PanelGroup, Stack, Tag } from 'rsuite';
import styled from 'styled-components';
import { useAppStateContext } from '../../modules/app-state-context/UseAppStateContext';
import { Pagination } from '../../modules/pagination/Pagination';
import { CsLogCard } from './cs-log-card/CsLogCard';
import * as searchjs from 'searchjs';
import { CsLog } from '../../modules/cs-log/entities/CsLog';
import { FileInfo } from '../../modules/file/FileInfo';
import ArrowBackIcon from '@rsuite/icons/ArowBack';
import PageIcon from '@rsuite/icons/Page';
import { Link } from 'react-router-dom';
import { PageRoutes } from '../../modules/navigation/Routes';
import SearchIcon from '@rsuite/icons/Search';

const defaultFormData: LogsViewPageFormData = {
  filter: ''
};

const StyledFormContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
`;
const StyledTextField = styled(TextField)`
  flex-grow: 1;
`;

const StyledNoDataContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;

  .icon {
    display: flex;
    align-items: center;
    gap: 10px;
  }
`;
const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const StyledPageContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const StyledPagination = styled(Pagination)`
  justify-content: flex-end;
` as typeof Pagination;

export function LogsViewPage(): ReactElement {
  const [appState] = useAppStateContext();
  const [paginatedLogs, setPaginatedLogs] = useState<CsLog[] | null>(() => null);
  const [filter, setFilter] = useState<string | null>(null);
  const filteredLogs = useMemo<CsLog[]>(() => {
    if (filter && appState.csLogs) {
      const logs = searchjs.matchArray(appState.csLogs, JSON.parse(filter));

      return logs;
    }

    return appState.csLogs;
  }, [filter, appState.csLogs]);

  const onSubmit = (values: LogsViewPageFormData) => {
    setFilter(values.filter ?? null);
  };
  const onFormChange = (values: LogsViewPageFormData) => {
    if (!values.filter?.trim()) {
      setFilter(null);
    }
  };

  return !appState.csLogs ? (
    <StyledNoDataContainer>
      <div className="icon">
        <PageIcon width="3em" height="3em" />
        <p>No log files uploaded</p>
      </div>
      <StyledLink to={PageRoutes.LogsUpload}>
        <ArrowBackIcon />
        <p>Go to upload page</p>
      </StyledLink>
    </StyledNoDataContainer>
  ) : (
    <StyledPageContainer>
      <Form defaultValue={defaultFormData} schema={logsViewPageFormSchema} onSubmit={onSubmit} onChange={onFormChange}>
        <StyledFormContent>
          <StyledTextField name="filter" />
          <IconButton icon={<SearchIcon />} appearance="primary" type="submit" />
        </StyledFormContent>
      </Form>
      <Stack wrap spacing={6}>
        {appState.loadedLogFilesInfo && appState.loadedLogFilesInfo.map((file: FileInfo) => <Tag key={file.name}>{file.name}</Tag>)}
      </Stack>
      <PanelGroup accordion bordered>
        {paginatedLogs?.map(({ id, data }) => <CsLogCard key={id} log={data} />)}
      </PanelGroup>
      <StyledPagination values={filteredLogs} onChange={setPaginatedLogs} />
    </StyledPageContainer>
  );
}
