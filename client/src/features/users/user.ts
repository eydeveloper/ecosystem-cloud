export interface User {
  id: string;
  accountId: string;
  limitSpace: number;
  usedSpace: number;
  firstName: string;
  lastName: string;
  avatar: string;
  email: string;
  password: string;
}