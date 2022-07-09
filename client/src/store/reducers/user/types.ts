import {IUser} from '../../../models/IUser';

export interface UserState {
  user: IUser;
}

export interface GetByAccountIdAction {
  payload: IUser;
}
