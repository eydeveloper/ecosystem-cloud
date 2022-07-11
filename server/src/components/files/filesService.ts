import * as fs from 'fs';
import path from 'path';
import File, {IFile} from './file';
import {FilesFormatter} from './filesFormatter';
import {CreateDirectoryBody, FileResponse} from './types';

export default class FilesService {
  static async getFiles(userId: string, parentId: string | null) {
    const files = await File.find({userId, parentId: parentId || null});
    return files.map(file => FilesFormatter.formatToFileResponse(file));
  }

  static async createRootDirectory(userId: string): Promise<string> {
    const directory = await new File({name: '', type: 'directory', userId});
    return FilesService.makeDirectory(directory);
  }

  static async createDirectory(data: CreateDirectoryBody): Promise<FileResponse> {
    const {name, type, userId, parentId} = data;
    const directory = new File({name, type, userId, parentId: parentId || null});
    let parentDirectory;

    if (parentId) {
      parentDirectory = await File.findById(parentId);
    }

    if (parentDirectory) {
      directory.path = path.join(parentDirectory.path, name);
      FilesService.makeDirectory(directory);
      parentDirectory.children.push(directory.id);
      await parentDirectory.save();
    } else {
      directory.path = name;
      FilesService.makeDirectory(directory);
    }

    await directory.save();

    return FilesFormatter.formatToFileResponse(directory);
  }

  static makeDirectory(file: IFile): string {
    const directoryPath = path.resolve('upload', 'files', String(file.userId), file.path);

    if (!fs.existsSync(directoryPath)) {
      fs.mkdirSync(directoryPath);
    }

    return directoryPath;
  }
}
