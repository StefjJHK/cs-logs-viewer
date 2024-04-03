import { ReactElement } from 'react';
import { FlexboxGrid, Header as RsHeader, Nav } from 'rsuite';
import styled from 'styled-components';
import { PageRoutes } from '../navigation/Routes';
import { useNavigate } from 'react-router-dom';
import { useCurrentPage } from '../navigation/UseCurrentPage';

const StyledLogo = styled.h1`
  font-size: 22px;
  color: var(--rs-orange-400);
`;

function Navigation(): ReactElement {
  const currentPage = useCurrentPage();
  const navigate = useNavigate();

  return (
    <Nav appearance="subtle" activeKey={currentPage} onSelect={navigate}>
      <Nav.Item eventKey={PageRoutes.LogsUpload}>Logs upload</Nav.Item>
      <Nav.Item eventKey={PageRoutes.LogsView}>Logs view</Nav.Item>
    </Nav>
  );
}

export function Header(): ReactElement {
  return (
    <RsHeader>
      <FlexboxGrid justify="space-between" align="middle">
        <FlexboxGrid.Item>
          <StyledLogo>CS Logs Viewer</StyledLogo>
        </FlexboxGrid.Item>
        <FlexboxGrid.Item>
          <Navigation />
        </FlexboxGrid.Item>
      </FlexboxGrid>
    </RsHeader>
  );
}
