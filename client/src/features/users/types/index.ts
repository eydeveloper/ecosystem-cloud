import {User} from '../user';

export interface UserState {
  user: User;
}

export interface GetUserAction {
  payload: User;
}
