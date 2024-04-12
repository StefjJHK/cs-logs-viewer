import styled from 'styled-components';
import { Badge } from 'rsuite';
import { CsLogData } from '../../../modules/cs-log/entities/CsLogData';
import { ReactElement } from 'react';
import stringFormat from 'string-format';
import { DateUtils } from '../../../utils/DateUtils';

const StyledPanelHeaderContainer = styled.div`
  display: flex;
  align-items: center;
  flex-grow: 1;
  gap: 20px;
  min-width: 0;

  .time {
    flex-shrink: 0;
  }

  .content {
    display: flex;
    align-items: center;
    min-width: 0;
    gap: 5px;

    &__message {
      flex-grow: 0;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      min-width: 0;
    }
  }
`;
const StyledBadge = styled(Badge)`
  flex-shrink: 0;
`;
export function CsLogCardHeader({ log }: { log: CsLogData }): ReactElement {
  const time = DateUtils.format(log['@t']);
  const logLevel = log['@l'];
  const template = stringFormat(log['@mt'], log) || log['@mt'] || 'No @mt field provided in log';

  return (
    <StyledPanelHeaderContainer>
      <p className="time">{time}</p>
      <div className="content">
        {(logLevel === 'Error' || logLevel === 'Fatal') && <StyledBadge color="red" />}
        {logLevel === 'Warning' && <StyledBadge color="orange" />}
        <p className="content__message">{template}</p>
      </div>
    </StyledPanelHeaderContainer>
  );
}
