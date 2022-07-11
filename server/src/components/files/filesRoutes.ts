import express from 'express';
import FilesController from './filesController';

const router = express.Router();

router.get('/', FilesController.getFiles);
router.post('/createDirectory', FilesController.createDirectory);

export default router;
