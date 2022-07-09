import * as fs from 'fs';
import path from 'path';
import File, {IFile} from './file';
import {CreateDirectoryRequest} from './filesRequests';

export default class FilesServices {
  public static async createRootDirectory(user: string) {
    return FilesServices.makeDirectory(
      new File({
        name: '',
        type: 'directory',
        user
      })
    );
  }

  public static async createDirectory(request: CreateDirectoryRequest<IFile>): Promise<IFile> {
    const {name, type, parent, user} = request.body;
    const file = new File({name, type, parent, user});
    const parentFile = await File.findById(parent);

    if (!parentFile) {
      file.path = name;
      FilesServices.makeDirectory(file);
    } else {
      file.path = path.join(parentFile.path, name);
      FilesServices.makeDirectory(file);
      parentFile.children.push(file.id);
      await parentFile.save();
    }

    await file.save();

    return file;
  }

  public static makeDirectory(file: IFile): string {
    const directoryPath = path.resolve('upload', 'files', String(file.user), file.path);

    if (!fs.existsSync(directoryPath)) {
      fs.mkdirSync(directoryPath);
    }

    return directoryPath;
  }
}
