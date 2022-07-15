import React, {FC} from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';
import HomePage from 'pages/home';

export interface IRoute {
  path: string;
  element: JSX.Element;
}

export enum RouteNames {
  HOME = '/'
}

export const privateRoutes: IRoute[] = [
  {path: RouteNames.HOME, element: <HomePage />}
];

export const Routing: FC = () => {
  return (
    <Routes>
      {privateRoutes.map(({path, element}) =>
        <Route path={path} element={element} key={path}></Route>
      )}
      <Route path="*" element={<Navigate replace to={RouteNames.HOME} />}></Route>
    </Routes>
  );
};
