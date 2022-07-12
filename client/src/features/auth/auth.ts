import {AccountUser} from '../users/user';

export interface Auth {
  token: string;
  user: AccountUser;
}
