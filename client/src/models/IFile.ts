import {IUser} from './IUser';

export interface IFile {
  id: string;
  name: string;
  type: string;
  accessLink: string;
  createdDate: string,
  size: number;
  user: IUser;
  parent: IFile;
  children: IFile[];
}
