import {IFile} from '../../../models/IFile';

export interface FileState {
  files: IFile[];
  currentDirectory: {};
}

export interface GetFilesAction {
  payload: IFile[];
}
