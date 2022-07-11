import {User} from '../users/user';

export interface Auth {
  token: string;
  user: User;
}
