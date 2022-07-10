import {IFile} from '../../../models/IFile';

export interface FileState {
  files: IFile[];
  currentDirectory: IFile;
  createDirectoryDialog: boolean;
}

export interface GetFilesAction {
  payload: IFile[];
}
