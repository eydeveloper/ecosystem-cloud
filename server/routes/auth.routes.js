const Router = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {check, validationResult} = require('express-validator');
const router = new Router();

router.post(
  '/registration',
  [
    check('email', 'Недопустимый формат адреса эл. почты').isEmail(),
    check('password', 'Минимальная длина пароля - 6 символов').isLength({min: 6})
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({message: 'Некорректный запрос', errors});
      }

      const {email, password} = req.body;
      const candidate = await User.findOne({email});

      if (candidate) {
        return res.status(400)
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

      return res.json({message: 'Вы успешно зарегистрированы'});
    } catch (e) {
      console.log(e);
      res.send({message: 'Произошла ошибка на сервере'});
    }
  }
);

module.exports = router;
