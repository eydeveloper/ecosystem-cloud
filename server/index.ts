import 'dotenv/config';
import express, {Express} from 'express';
import {connect} from 'mongoose';
import corsMiddleware from './middleware/corsMiddleware';
import userRouter from './components/users/usersRoutes';
import filesRouter from './components/files/filesRoutes';

const app: Express = express();
const port: number = Number(process.env.PORT) || 5000;

app.use(corsMiddleware);
app.use(express.json());
app.use('/api/users', userRouter);
app.use('/api/files', filesRouter);

const start = async () => {
  try {
    await connect(`${process.env.MONGO_URI}`);
    app.listen(port, () => {
      console.log(`[server]: Server is running at http://localhost:${port}`);
    });
  } catch (e) {
    console.log(e);
  }
};

start();
