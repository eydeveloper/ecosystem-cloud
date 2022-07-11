import {IFile} from './file';
import {FileResponse} from './types';

export class FilesFormatter {
  static formatToFileResponse(file: IFile): FileResponse {
    return {
      id: file.id.toString(),
      name: file.name,
      type: file.type,
      size: file.size,
      createdDate: file.createdDate
    };
  }
}
