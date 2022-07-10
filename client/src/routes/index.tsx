import Home from '../pages/Home';

interface IRoute {
  path: string;
  element: JSX.Element;
}

export enum RouteNames {
  HOME = '/'
}

export const privateRoutes: IRoute[] = [
  {path: RouteNames.HOME, element: <Home />}
];
