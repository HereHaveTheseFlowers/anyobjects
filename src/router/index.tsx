import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Loader } from '../components';
import { withPrivateRoute } from './withPrivateRoute';
import { RouterList } from './routerList';

const HomePage = lazy(() => import('../pages/Home'));
const AboutPage = lazy(() => import('../pages/About'));
const ObjectPage = lazy(() => import('../pages/Object'));
const AdminPage = lazy(() => import('../pages/Admin'));
const AdminEditPage = lazy(() => import('../pages/AdminEdit'));
const ServerErrorPage = lazy(() => import('../pages/ServerError'));
const NotFoundPage = lazy(() => import('../pages/NotFound'));

export function Router() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path={RouterList.HOME}>
          <Route index element={<HomePage />} />
          <Route path={RouterList.ABOUT} element={<AboutPage />} />
          <Route path={RouterList.SERVER_ERROR} element={<ServerErrorPage />} />
          <Route path={RouterList.NOT_FOUND} element={<NotFoundPage />} />
          
          <Route path={RouterList.OBJECT}>
            <Route index element={<NotFoundPage />} />
            <Route
              path={RouterList.OBJECT_ID_PARAM}
              element={<ObjectPage />}
            />
          </Route>
          <Route path={RouterList.ADMIN}>
            <Route index element={<AdminPage />} />
            <Route
              path={RouterList.ADMIN_EDIT}
              element={withPrivateRoute(<AdminEditPage />)}
            />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
}
