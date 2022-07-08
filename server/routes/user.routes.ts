import express, {Request, Response} from 'express';
import User from '../models/User';

const router = express.Router();

router.get('/getData',
  async (request: Request, response: Response) => {
    try {
      const accountId = request.query.userId;
      let user = await User.findOne({userId: accountId});

      if (!user) {
        user = new User({accountId});
        await user.save();
      }

      response.json({
        user: {
          id: user.id,
          limitSpace: user.limitSpace,
          usedSpace: user.usedSpace
        }
      });
    } catch (e) {
      console.log(e);
      response.send({message: 'Server error'});
    }
  });

export default router;
