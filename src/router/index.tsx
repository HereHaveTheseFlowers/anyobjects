import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { Loader } from "../components";
import { withPrivateRoute } from "./withPrivateRoute";
import { RouterList } from "./routerList";

import HomePage from "../pages/Home";
import AboutPage from "../pages/About";
import ObjectPage from "../pages/Object";
//const HomePage = lazy(() => import(/* webpackChunkName: "home" */ '../pages/Home'));
//const AboutPage = lazy(() => import(/* webpackChunkName: "about" */ '../pages/About'));
//const ObjectPage = lazy(() => import(/* webpackChunkName: "object" */ '../pages/Object'));
const AdminPage = lazy(
  () => import(/* webpackChunkName: "admin" */ "../pages/Admin"),
);
const AdminEditPage = lazy(
  () => import(/* webpackChunkName: "adminedit" */ "../pages/AdminEdit"),
);
const ServerErrorPage = lazy(
  () => import(/* webpackChunkName: "servererror" */ "../pages/ServerError"),
);
const NotFoundPage = lazy(
  () => import(/* webpackChunkName: "notfound" */ "../pages/NotFound"),
);

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
            <Route path={RouterList.OBJECT_ID_PARAM} element={<ObjectPage />} />
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
