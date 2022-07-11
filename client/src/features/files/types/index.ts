import {File} from '../file';

export interface FileState {
  files: File[];
  currentDirectory: File;
  stack: File[],
  createDirectoryDialog: boolean;
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
