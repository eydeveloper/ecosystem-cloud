import {AccountUser} from '../../users/user';

export interface AuthState {
  isAuthorized: boolean;
  user: AccountUser;
  isLoading: boolean;
  error: string;
}

export interface VerifyActionSuccess {
  payload: { user: AccountUser };
}
