interface BaseFile {
  name: string;
  type: string;
}

export interface CreateDirectoryBody extends BaseFile {
  userId: string;
  parentId: string;
}

export interface FileResponse extends BaseFile {
  id: string;
  size: number;
  createdDate: Date;
}
