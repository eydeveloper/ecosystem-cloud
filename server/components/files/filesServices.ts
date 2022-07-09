import * as fs from 'fs';
import path from 'path';
import File, {IFile} from './file';

export default class FilesServices {
  static async getFiles(userId: string, parentId: string): Promise<IFile[]> {
    return File.find({userId, parentId: parentId || null});
  }

  static async createRootDirectory(userId: string): Promise<string> {
    const directory = await new File({name: '', type: 'directory', userId});
    return FilesServices.makeDirectory(directory);
  }

  static async createDirectory(data: IFile): Promise<IFile> {
    const {name, type, userId, parentId} = data;
    const file = new File({name, type, userId, parentId: parentId || null});
    let parentFile;

    if (parentId) {
      parentFile = await File.findById(parentId);
    }

    if (parentFile) {
      file.path = path.join(parentFile.path, name);
      FilesServices.makeDirectory(file);
      parentFile.children.push(file.id);
      await parentFile.save();
    } else {
      file.path = name;
      FilesServices.makeDirectory(file);
    }

    return await file.save();
  }

  static makeDirectory(file: IFile): string {
    const directoryPath = path.resolve('upload', 'files', String(file.userId), file.path);

    if (!fs.existsSync(directoryPath)) {
      fs.mkdirSync(directoryPath);
    }

    return directoryPath;
  }
}
