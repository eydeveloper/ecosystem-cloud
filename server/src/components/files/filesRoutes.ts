import express, {NextFunction, Request, Response} from 'express';
import fileUpload from 'express-fileupload';
import FilesController from './filesController';

const router = express.Router();

router.get('/', FilesController.getFiles);
router.post('/createDirectory', FilesController.createDirectory);
router.post('/uploadFile', fileUpload(), FilesController.uploadFile);

export default router;
