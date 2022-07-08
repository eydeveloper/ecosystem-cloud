import express from 'express';
import UsersController from './usersController';

const router = express.Router();

router.get('/getByAccountId', UsersController.getByAccountId);

export default router;
