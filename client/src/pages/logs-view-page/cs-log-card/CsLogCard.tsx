import { ReactElement } from 'react';
import { Divider, List, Panel } from 'rsuite';
import styled from 'styled-components';
import { CsLogCardHeader } from './CsLogCardHeader';
import { CsLogData } from '../../../modules/cs-log/entities/CsLogData';

export interface CsLogCardProps {
  log: CsLogData;
}

const StyledList = styled(List)`
  margin-left: 10px;
`;
const StyledListItem = styled(List.Item)`
  display: flex;
  align-items: center;

  .key-name {
    display: block;
    width: 200px;
    min-width: 200px;
  }
`;
export function CsLogCard({ log }: CsLogCardProps): ReactElement {
  return (
    <Panel header={<CsLogCardHeader log={log} />} key={log['@t'].toString()}>
      <StyledList hover>
        {Object.entries(log).map(([key, value]) => (
          <StyledListItem key={key}>
            <span className="key-name">{key?.toString()}</span>
            <Divider vertical />
            {JSON.stringify(value)}
          </StyledListItem>
        ))}
      </StyledList>
    </Panel>
  );
}
