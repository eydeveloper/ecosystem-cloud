import Home from '../../features/workspace/pages/Home';
import {IRoute} from './types';

export enum RouteNames {
  HOME = '/'
}

export const privateRoutes: IRoute[] = [
  {path: RouteNames.HOME, element: <Home />}
];
