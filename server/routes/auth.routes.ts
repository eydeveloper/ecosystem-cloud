import bcrypt from 'bcryptjs';
import express, {Request, Response} from 'express';
import {check, validationResult} from 'express-validator';
import jwt from 'jsonwebtoken';
import User from '../models/User';

const router = express.Router();

router.post(
  '/registration',
  [
    check('email', 'Недопустимый формат адреса эл. почты').isEmail(),
    check('password', 'Минимальная длина пароля - 6 символов').isLength({min: 6})
  ],
  async (request: Request, response: Response) => {
    try {
      const errors = validationResult(request);

      if (!errors.isEmpty()) {
        return response.status(400).json({message: 'Некорректный запрос', errors});
      }

      const {email, password} = request.body;
      const candidate = await User.findOne({email});

      if (candidate) {
        return response.status(400)
          .json({
            message: `Пользователь с указанным адресом эл. почты уже зарегистрирован`
          });
      }

      const hashPassword = await bcrypt.hash(password, 8);
      const user = new User({
        email,
        password: hashPassword
      });

      await user.save();

      return response.json({message: 'Вы успешно зарегистрированы'});
    } catch (e) {
      console.log(e);
      response.send({message: 'Произошла ошибка на сервере'});
    }
  }
);

router.post('/login', async (request: Request, response: Response) => {
  try {
    const {email, password} = request.body;
    const user = await User.findOne({email});

    if (!user) {
      return response.status(404).json({message: 'Не найден аккаунт с данным адресом эл. почты'});
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);

    if (!isPasswordValid) {
      return response.status(404).json({message: 'Неверный пароль'});
    }

    const secretKey = process.env.JWT_SECRET_KEY || 'secret';
    const token = jwt.sign({id: user.id}, secretKey, {expiresIn: '1h'});

    return response.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        diskSpace: user.diskSpace,
        usedSpace: user.usedSpace,
        avatar: user.avatar
      }
    });
  } catch (e) {
    console.log(e);
    response.send({message: 'Произошла ошибка на сервере'});
  }
});

export default router;
