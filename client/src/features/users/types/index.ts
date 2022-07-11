import {User} from '../user';

export interface UserState {
  user: User;
}

export interface GetByAccountIdAction {
  payload: User;
}
