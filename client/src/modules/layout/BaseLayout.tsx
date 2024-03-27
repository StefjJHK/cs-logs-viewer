import 'rsuite/dist/rsuite.min.css';
import { ReactElement } from 'react';
import { Container, Content, CustomProvider as RSuiteProvider } from 'rsuite';
import { Outlet } from 'react-router-dom';
import { Footer } from './Footer';
import { useTheme } from '../theme/useTheme';
import styled from 'styled-components';
import { AppStateContextProvider } from '../app-state-context/AppStateContextProvider';
import { AppStorageContextProvider } from '../app-storage-context/AppStorageContextProvider';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from '../error-boundary/ErrorFallback';
import { Header } from './Header';

const StyledContainer = styled(Container)`
  padding: 0 50px;

  .content {
    display: flex;

    & > * {
      flex-grow: 1;
    }
  }
`;

function AppLayout(): ReactElement {
  return (
    <StyledContainer>
      <Header />
      <Content className="content">
        <Outlet />
      </Content>
      <Footer />
    </StyledContainer>
  );
}

export function BaseLayout(): ReactElement {
  const theme = useTheme();

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <AppStorageContextProvider>
        <AppStateContextProvider>
          <RSuiteProvider theme={theme}>
            <AppLayout />
          </RSuiteProvider>
        </AppStateContextProvider>
      </AppStorageContextProvider>
    </ErrorBoundary>
  );
}
