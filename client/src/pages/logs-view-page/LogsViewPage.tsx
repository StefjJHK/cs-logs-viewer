import { ReactElement, useState } from 'react';
import { LogsViewPageFormData, SortOrder } from './LogsViewPageFormData';
import { PanelGroup } from 'rsuite';
import styled from 'styled-components';
import { useAppStateContext } from '../../modules/app-state-context/UseAppStateContext';
import { Pagination } from '../../modules/pagination/Pagination';
import { CsLogCard } from './cs-log-card/CsLogCard';
import { CsLog } from '../../modules/cs-log/entities/CsLog';
import ArrowBackIcon from '@rsuite/icons/ArowBack';
import PageIcon from '@rsuite/icons/Page';
import { Link } from 'react-router-dom';
import { PageRoutes } from '../../modules/navigation/Routes';
import { LogsFilter } from './LogsFilter';
import { Loader } from '../../modules/loader/Loader';

const defaultFilter: LogsViewPageFormData = {
  filter: '',
  order: SortOrder.Ascending
};
const logsCountPerPage = 15;

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
  gap: 10px;

  .logs-wrapper {
    display: flex;
    flex-direction: column;
    position: relative;
  }
`;
const StyledPagination = styled(Pagination)`
  justify-content: flex-end;
` as typeof Pagination;

function NoData(): ReactElement {
  return (
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
  );
}

export function LogsViewPage(): ReactElement {
  const [appState] = useAppStateContext();
  const [filteredLogs, setFilteredLogs] = useState<CsLog[]>([]);
  const [onFiltering, setOnFiltering] = useState(false);
  const [paginatedLogs, setPaginatedLogs] = useState<CsLog[]>([]);

  return !appState.csLogs || !appState.loadedLogFilesInfo ? (
    <NoData />
  ) : (
    <StyledPageContainer>
      <LogsFilter
        defaultFilter={defaultFilter}
        logs={appState.csLogs}
        loadedLogFiles={appState.loadedLogFilesInfo}
        onChange={setFilteredLogs}
        onFiltering={setOnFiltering}
      />
      <div className="logs-wrapper">
        {onFiltering && <Loader title="filtering..." size="sm" type="backdrop" />}
        <PanelGroup accordion bordered>
          {paginatedLogs.map(({ id, data }) => (
            <CsLogCard key={id} log={data} />
          ))}
        </PanelGroup>
        <StyledPagination values={filteredLogs} countPerPage={logsCountPerPage} onChange={setPaginatedLogs} />
      </div>
    </StyledPageContainer>
  );
}
