import { ReactElement, useEffect, useState, useTransition } from 'react';
import { logsViewPageFormSchema } from './LogsViewPageFormSchema';
import { IconButton, Stack, Tag } from 'rsuite';
import SearchIcon from '@rsuite/icons/Search';
import { FileInfo } from '../../modules/file/FileInfo';
import { FieldGroup } from '../../modules/forms/FieldGroup';
import { RadioField } from '../../modules/forms/RadioField';
import { LogsViewPageFormData, SortOrder } from './LogsViewPageFormData';
import SortUpIcon from '@rsuite/icons/SortUp';
import SortDownIcon from '@rsuite/icons/SortDown';
import styled from 'styled-components';
import { Form } from '../../modules/forms/Form';
import { TextField } from '../../modules/forms/TextField';
import { CsLog } from '../../modules/cs-log/entities/CsLog';
import * as searchjs from 'searchjs';
import { ISortByObjectSorter, sort } from 'fast-sort';

export interface LogsFilterProps {
  defaultFilter: LogsViewPageFormData;
  logs: CsLog[];
  loadedLogFiles: FileInfo[];
  onChange?(logs: CsLog[]): void;
  onFiltering?(loading: boolean): void;
}

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  gap: 10px;

  .search-group {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 5px;
  }

  .text-field {
    flex-grow: 1;
  }

  .order {
    align-self: flex-end;
  }

  .group-wrapper {
    display: flex;
    justify-content: space-between;
  }
`;
export function LogsFilter({ defaultFilter, logs, loadedLogFiles, onChange, onFiltering }: LogsFilterProps): ReactElement {
  const [isFiltering, startFilteringTransaction] = useTransition();
  const [filter, setFilter] = useState<string | null>(null);
  const [order, setOrder] = useState<SortOrder>(defaultFilter.order);

  useEffect(() => {
    if (onFiltering) {
      onFiltering(isFiltering);
    }
  }, [isFiltering]);

  useEffect(() => {
    if (onChange) {
      startFilteringTransaction(() => {
        const sortFn = (x: CsLog) => x.data['@t'];
        const sorter: ISortByObjectSorter<CsLog> = order === SortOrder.Ascending ? { asc: sortFn } : { desc: sortFn };
        const filteredLogs = filter ? searchjs.matchArray(logs, JSON.parse(filter)) : logs;
        const sortedLogs = sort<CsLog>(filteredLogs).by(sorter);

        onChange(sortedLogs);
      });
    }
  }, [order, logs]);

  const onSubmit = (values: LogsViewPageFormData) => {
    setFilter(values.filter ?? null);
  };
  const onFormChange = (values: LogsViewPageFormData) => {
    if (!values.filter?.trim()) {
      setFilter(null);
    }

    if (order != values.order) {
      setOrder(values.order);
    }
  };

  return (
    <StyledForm defaultValue={defaultFilter} schema={logsViewPageFormSchema} onSubmit={onSubmit} onChange={onFormChange}>
      <div className="search-group">
        <TextField className="text-field" name="filter" />
        <IconButton icon={<SearchIcon />} appearance="primary" type="submit" />
      </div>
      <div className="group-wrapper">
        <Stack wrap spacing={6}>
          {loadedLogFiles && loadedLogFiles.map((file: FileInfo) => <Tag key={file.name}>{file.name}</Tag>)}
        </Stack>
        <FieldGroup name="order" className="order" appearance="picker" inline>
          <RadioField name="order" label="Ascending" value={SortOrder.Ascending} icon={<SortUpIcon height="1.5em" width="1.5em" />} />
          <RadioField name="order" label="Descending" value={SortOrder.Descending} icon={<SortDownIcon height="1.5em" width="1.5em" />} />
        </FieldGroup>
      </div>
    </StyledForm>
  );
}
