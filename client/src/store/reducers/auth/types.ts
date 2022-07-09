import {IUser} from '../../../models/IUser';

export interface AuthState {
  isAuthorized: boolean;
  user: IUser;
  isLoading: boolean;
  error: string;
}

export interface VerifyActionSuccess {
  payload: {user: IUser};
}
