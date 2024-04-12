import { ReactElement } from 'react';
import styled from 'styled-components';
import { Loader as RsLoader } from 'rsuite';

export interface LoaderProps {
  type?: 'backdrop';
  size: 'xs' | 'sm' | 'md' | 'lg';
  title?: string;
  className?: string;
}

const StyledBackdropLoaderWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: var(--rs-loader-backdrop);
  z-index: 1;

  .loader {
    position: absolute;
    top: 50%;
    left: 50%;
  }
`;

export function Loader({ type = 'backdrop', size, title, className }: LoaderProps): ReactElement {
  return type === 'backdrop' ? (
    <StyledBackdropLoaderWrapper className={className}>
      <RsLoader className="loader" size={size} content={title} vertical />
    </StyledBackdropLoaderWrapper>
  ) : (
    <RsLoader size={size} content={title} className={className} />
  );
}
