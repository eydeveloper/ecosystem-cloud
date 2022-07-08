import React, {FC} from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';
import {privateRoutes, RouteNames} from '../routes';

const AppRouter: FC = () => {
  return (
    <Routes>
      {privateRoutes.map(({path, element}) =>
        <Route path={path} element={element} key={path}></Route>
      )}
      <Route path="*" element={<Navigate replace to={RouteNames.CLOUD} />}></Route>
    </Routes>
  );
};

export default AppRouter;