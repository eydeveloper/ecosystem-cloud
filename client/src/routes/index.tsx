import Cloud from '../pages/Cloud';

interface IRoute {
  path: string;
  element: JSX.Element;
}

export enum RouteNames {
  CLOUD = '/'
}

export const publicRoutes: IRoute[] = [];

export const privateRoutes: IRoute[] = [
  {path: RouteNames.CLOUD, element: <Cloud />}
];
