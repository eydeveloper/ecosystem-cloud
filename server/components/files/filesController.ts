import {Request, Response} from 'express';
import {errorHandler} from '../../handlers/errorHandler';
import File, {IFile} from './file';
import {CreateDirectoryRequest} from './filesRequests';
import FilesServices from './filesServices';

export default class FilesController {
  public static async createDirectory(request: CreateDirectoryRequest<IFile>, response: Response) {
    try {
      const directory = await FilesServices.createDirectory(request);
      response.send(directory);
    } catch (error) {
      errorHandler.handleError(error, response);
    }
  }

  public static async getFiles(request: Request, response: Response) {
    try {
      const {user, parent} = request.query;
      const files = await File.find({user, parent});
      response.send(files);
    } catch (error) {
      errorHandler.handleError(error, response);
    }
  }
}
