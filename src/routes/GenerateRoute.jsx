import _ from "lodash";
import { Route, Routes as ReactRoutes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import ErrorPage from "./ErrorPage";

const generateFlattenRoutes = (routes) => {
  if (!routes) return [];
  return _.flattenDeep(
    routes.map(({ routes: subRoutes, ...rest }) => [
      rest,
      generateFlattenRoutes(subRoutes),
    ]),
  );
};

export const renderRoutes = (mainRoutes) => {
  const Routes = (props) => {
    const { isAuthorized } = props;
    const layouts = mainRoutes.map(({ layout: Layout, routes }, index) => {
      const subRoutes = generateFlattenRoutes(routes);
      const isPublic = routes[0].isPublic ?? false;
      return (
        <Route key={index} element={<Layout />}>
          <Route
            element={
              <ProtectedRoute isAuthorized={isAuthorized} isPublic={isPublic} />
            }
          >
            {subRoutes.map(({ component: Component, path, name }) => {
              return (
                Component &&
                path && <Route key={name} element={<Component />} path={path} />
              );
            })}
            <Route path="/*" element={<ErrorPage />} />
          </Route>
          {/* <Route path="/*" element={<ErrorPage />} /> */}
        </Route>
      );
    });
    return <ReactRoutes>{layouts}</ReactRoutes>;
  };
  return Routes;
};
