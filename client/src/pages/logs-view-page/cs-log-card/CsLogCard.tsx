import { ReactElement } from 'react';
import { Divider, List, Message, Panel, toaster } from 'rsuite';
import styled from 'styled-components';
import { CsLogCardHeader } from './CsLogCardHeader';
import { CsLogData } from '../../../modules/cs-log/entities/CsLogData';
import JSONPretty from 'react-json-pretty';
import { DateUtils } from '../../../utils/DateUtils';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import IconButton from 'rsuite/IconButton';
import CopyIcon from '@rsuite/icons/Copy';

export interface CsLogCardProps {
  log: CsLogData;
}

const ListItemValueContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-grow: 1;

  .json-pretty {
    flex-grow: 1;
    line-height: 1.3;
    color: rgba(248, 248, 242, 1);
    overflow: auto;
    .__json-key__ {
      color: rgba(255, 94, 94, 1);
    }
    .__json-value__ {
      color: rgba(253, 176, 130, 1);
    }
    .__json-string__ {
      color: rgba(233, 253, 172, 1);
    }
    .__json-boolean__ {
      color: rgba(102, 153, 204, 1);
    }
    .__json-pretty-error__ {
      line-height: 1.3;
      color: rgba(248, 248, 242, 1);
      background: #1e1e1e;
      overflow: auto;
    }
  }

  .clipboard-wrapper {
    visibility: hidden;
    padding-right: 5px;
    align-self: flex-start;
  }

  &:hover {
    .clipboard-wrapper {
      visibility: visible;
    }
  }
`;
function ListItemValue({ fieldName, fieldValue }: { fieldName: string; fieldValue: string | number | Date | object }): ReactElement {
  const onValueCopy = () =>
    toaster.push(
      <Message showIcon type="success">
        Field &quot;{fieldName}&quot; was copied!
      </Message>,
      { placement: 'bottomEnd' }
    );

  return (
    <ListItemValueContainer>
      {typeof fieldValue === 'number' || typeof fieldValue === 'string' ? (
        fieldValue
      ) : fieldValue instanceof Date ? (
        DateUtils.format(fieldValue)
      ) : (
        <JSONPretty themeClassName="json-pretty" data={fieldValue} />
      )}
      <div className="clipboard-wrapper">
        <CopyToClipboard onCopy={onValueCopy} text={JSON.stringify(fieldValue, null, 2)}>
          <IconButton icon={<CopyIcon />} />
        </CopyToClipboard>
      </div>
    </ListItemValueContainer>
  );
}

const StyledList = styled(List)`
  margin-left: 10px;

  & > .item {
    display: flex;
    align-items: center;
    padding: 3px 0;

    &:hover {
      background-color: var(--rs-gray-800);
    }

    .key-name {
      display: block;
      width: 200px;
      min-width: 200px;
    }
  }
`;
export function CsLogCard({ log }: CsLogCardProps): ReactElement {
  return (
    <Panel header={<CsLogCardHeader log={log} />} key={log['@t'].toString()}>
      <StyledList hover>
        {Object.entries(log).map(([key, value]) => (
          <div className="item" key={key}>
            <span className="key-name">{key?.toString()}</span>
            <Divider vertical />
            <ListItemValue fieldName={key} fieldValue={value} />
          </div>
        ))}
      </StyledList>
    </Panel>
  );
}
