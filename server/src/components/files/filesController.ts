import {errorHandler} from '../../core/handlers/errorHandler';
import {TypedRequestBody} from '../../core/types/typedRequestBody';
import {TypedRequestQuery} from '../../core/types/typedRequestQuery';
import {TypedResponse} from '../../core/types/typedResponse';
import FilesService from './filesService';
import {CreateDirectoryBody, FileResponse} from './types';

export default class FilesController {
  static async getFiles(
    request: TypedRequestQuery<{ userId: string; parentId: string }>,
    response: TypedResponse<FileResponse[]>
  ) {
    try {
      const {userId, parentId} = request.query;
      const files = await FilesService.getFiles(userId, parentId);
      return response.json(files);
    } catch (error) {
      errorHandler.handleError(error, response);
    }
  }

  static async createDirectory(
    request: TypedRequestBody<CreateDirectoryBody>,
    response: TypedResponse<FileResponse>
  ) {
    try {
      const directory = await FilesService.createDirectory(request.body);
      response.json(directory);
    } catch (error) {
      errorHandler.handleError(error, response);
    }
  }
}
