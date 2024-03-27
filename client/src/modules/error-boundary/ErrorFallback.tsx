import { FallbackProps } from 'react-error-boundary';
import { ReactElement } from 'react';
import styled from 'styled-components';
import { Button } from 'rsuite';

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  color: var(--rs-red-500);

  .reset {
    width: 100px;
  }
`;

export function ErrorFallback({ error, resetErrorBoundary }: FallbackProps): ReactElement {
  return (
    <StyledWrapper>
      <StyledContainer>
        <p>
          <strong>Error!</strong> {error.message}
        </p>
        <Button onClick={resetErrorBoundary} className="reset" appearance="primary">
          Reset
        </Button>
      </StyledContainer>
    </StyledWrapper>
  );
}
