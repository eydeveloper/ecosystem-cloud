interface BaseUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface AuthBody {
  user: BaseUser;
}
