import {TypedRequestBody} from '../../core/types/typedRequestBody';
import {TypedRequestQuery} from '../../core/types/typedRequestQuery';
import {TypedResponse} from '../../core/types/typedResponse';
import {errorHandler} from '../../core/handlers/errorHandler';
import {IFile} from './file';
import FilesServices from './filesServices';

export default class FilesController {
  static async getFiles(
    request: TypedRequestQuery<{ userId: string; parentId: string }>,
    response: TypedResponse<IFile[]>
  ) {
    try {
      const {userId, parentId} = request.query;
      const files = await FilesServices.getFiles(userId, parentId);

      response.json(files.map(file => ({
        id: file.id,
        name: file.name,
        type: file.type,
        createdDate: file.createdDate,
        size: file.size
      } as IFile)));
    } catch (error) {
      errorHandler.handleError(error, response);
    }
  }

  static async createDirectory(
    request: TypedRequestBody<IFile>,
    response: TypedResponse<IFile>
  ) {
    try {
      const directory = await FilesServices.createDirectory(request.body);

      response.json({
        id: directory.id,
        name: directory.name,
        createdDate: directory.createdDate,
        size: directory.size
      } as IFile);
    } catch (error) {
      errorHandler.handleError(error, response);
    }
  }
}
