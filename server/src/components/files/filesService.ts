import {FileArray, UploadedFile} from 'express-fileupload';
import * as fs from 'fs';
import path from 'path';
import {AppError} from '../../core/errors/appError';
import User from '../users/user';
import File, {IFile} from './file';
import {FilesFormatter} from './filesFormatter';
import {CreateDirectoryBody, FileResponse, UploadFileBody} from './types';

export default class FilesService {
  static async getFiles(userId: string, parentId: string | null): Promise<FileResponse[]> {
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

  static async uploadFile(data: UploadFileBody): Promise<FileResponse> {
    const {userId, parentId, files} = data;

    if (!files?.file) {
      throw new AppError('Не удалось загрузить файл.', 400);
    }

    const uploadedFile = files.file as UploadedFile;
    const parentDirectory = await File.findOne({_id: parentId || null, userId});
    const user = await User.findById(userId);

    if (!user) {
      throw new AppError('Произошла ошибка.', 400);
    }

    if (user.usedSpace + uploadedFile.size > user.limitSpace) {
      throw new AppError('Недостаточно свободного места в хранилище.', 400);
    }

    user.usedSpace = user.usedSpace + uploadedFile.size;

    let uploadedFilePath;
    if (parentDirectory) {
      uploadedFilePath = path.resolve('upload', 'files', String(user.id), parentDirectory.path, uploadedFile.name);
    } else {
      uploadedFilePath = path.resolve('upload', 'files', String(user.id), uploadedFile.name);
    }

    if (fs.existsSync(uploadedFilePath)) {
      throw new AppError('Файл с таким названием уже существует.', 400);
    }

    await uploadedFile.mv(uploadedFilePath);

    const type = uploadedFile.name.split('.').pop();
    const file = new File({
      name: uploadedFile.name,
      type,
      size: uploadedFile.size,
      path: parentDirectory?.path,
      userId: user?.id,
      parentId: parentDirectory?.id
    });

    await file.save();
    await user.save();

    return FilesFormatter.formatToFileResponse(file);
  }

  static makeDirectory(file: IFile): string {
    const directoryPath = path.resolve('upload', 'files', String(file.userId), file.path);

    if (!fs.existsSync(directoryPath)) {
      fs.mkdirSync(directoryPath);
    }

    return directoryPath;
  }
}
