import express from 'express';
import UsersController from './usersController';

const router = express.Router();

router.get('/', UsersController.get);

export default router;
