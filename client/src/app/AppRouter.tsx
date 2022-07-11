import React, {FC} from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';
import {privateRoutes, RouteNames} from '../common/routes';

const AppRouter: FC = () => {
  return (
    <Routes>
      {privateRoutes.map(({path, element}) =>
        <Route path={path} element={element} key={path}></Route>
      )}
      <Route path="*" element={<Navigate replace to={RouteNames.HOME} />}></Route>
    </Routes>
  );
};

export default AppRouter;
