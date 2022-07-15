export interface User {
  firstName: string;
  lastName: string;
  avatar: string;
  email: string;
}

export interface UserState {
  user: User;
  isAuthorized: boolean;
  isLoading: boolean;
  error: string;
}

export interface VerifyActionSuccess {
  payload: { user: User };
}
