import {IFile} from '../../../models/IFile';

export interface FileState {
  files: IFile[];
  currentDirectory: IFile;
  stack: IFile[],
  createDirectoryDialog: boolean;
}

export interface SetCurrentDirectoryIdAction {
  payload: string;
}

export interface PushDirectoryToStackAction {
  payload: IFile;
}

export interface RemoveDirectoriesFromStack {
  payload: string;
}

export interface GetFilesAction {
  payload: IFile[];
}

export interface CreateDirectoryAction {
  payload: IFile;
}
