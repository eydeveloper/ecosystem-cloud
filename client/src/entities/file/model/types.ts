export interface File {
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

export interface FileState {
  files: File[];
  currentDirectory: File;
  stack: File[],
  createDirectoryDialog: boolean;
  isDragFileEnter: boolean;
}

export interface SetCurrentDirectoryIdAction {
  payload: string;
}

export interface PushDirectoryToStackAction {
  payload: File;
}

export interface RemoveDirectoriesFromStack {
  payload: string;
}

export interface GetFilesAction {
  payload: File[];
}

export interface CreateDirectoryAction {
  payload: File;
}
