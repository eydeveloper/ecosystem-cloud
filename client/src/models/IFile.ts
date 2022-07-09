export interface IFile {
  id: string;
  name: string;
  type: string;
  accessLink: string;
  createdDate: string,
  size: number;
  userId: string;
  parentId: string;
  children: string[];
}
