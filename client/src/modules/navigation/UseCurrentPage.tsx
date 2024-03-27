import { PageRoutes } from './Routes';
import { useLocation } from 'react-router-dom';

export function useCurrentPage(): PageRoutes {
  const location = useLocation();

  return location.pathname as PageRoutes;
}
