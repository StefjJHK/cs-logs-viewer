import { ReactElement } from 'react';
import styled from 'styled-components';

const StyledContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 10px 0;
`;
export function Footer(): ReactElement {
  return (
    <StyledContainer>
      <p>Version 1.0.4</p>
    </StyledContainer>
  );
}
