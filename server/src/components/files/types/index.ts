import {FileArray} from 'express-fileupload';

interface BaseFile {
  name: string;
  type: string;
}

export interface CreateDirectoryBody extends BaseFile {
  userId: string;
  parentId: string;
}

export interface UploadFileBody {
  userId: string;
  parentId?: string;
  files: FileArray | undefined;
}

export interface FileResponse extends BaseFile {
  id: string;
  size: number;
  createdDate: Date;
}
