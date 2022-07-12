import {UploadedFile} from 'express-fileupload';
import * as fs from 'fs';
import path from 'path';
import {AppError} from '../../core/errors/appError';
import {errorHandler} from '../../core/handlers/errorHandler';
import {TypedRequestBody} from '../../core/types/typedRequestBody';
import {TypedRequestQuery} from '../../core/types/typedRequestQuery';
import {TypedResponse} from '../../core/types/typedResponse';
import User from '../users/user';
import File from './file';
import FilesService from './filesService';
import {CreateDirectoryBody, FileResponse, UploadFileBody} from './types';

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
      return response.json(directory);
    } catch (error) {
      errorHandler.handleError(error, response);
    }
  }

  static async uploadFile(
    request: TypedRequestBody<UploadFileBody>,
    response: TypedResponse<FileResponse>
  ) {
    try {
      console.log(request.files);
      const {userId, parentId} = request.body;
      const file = await FilesService.uploadFile({
        userId, parentId, files: request.files
      });
      return response.json(file);
    } catch (error) {
      errorHandler.handleError(error, response);
    }
  }
}
