import {IFile} from '../../../models/IFile';

export interface FileState {
  files: IFile[];
  currentDirectory: IFile;
}

export interface GetFilesAction {
  payload: IFile[];
}
