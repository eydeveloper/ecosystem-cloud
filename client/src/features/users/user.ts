export interface AccountUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
}

export interface User {
  id: string;
  accountId: string;
  limitSpace: number;
  usedSpace: number;
}
