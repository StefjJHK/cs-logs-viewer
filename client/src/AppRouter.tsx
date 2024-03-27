import { createBrowserRouter, Navigate, RouteObject } from 'react-router-dom';
import { PageRoutes } from './modules/navigation/Routes';
import { BaseLayout } from './modules/layout/BaseLayout';
import { LogsViewPage } from './pages/logs-view-page/LogsViewPage';
import { AboutPage } from './pages/about-page/AboutPage';
import { LogsUploadPage } from './pages/logs-upload-page/LogsUploadPage';

const routes: RouteObject[] = [
  {
    index: true,
    element: <Navigate to={PageRoutes.LogsUpload} />
  },
  {
    path: 'logs-upload',
    element: <LogsUploadPage />
  },
  {
    path: 'logs-view',
    element: <LogsViewPage />
  },
  {
    path: 'about',
    element: <AboutPage />
  }
];

export const appRouter = createBrowserRouter([
  {
    path: '',
    element: <BaseLayout />,
    children: routes
  }
]);
