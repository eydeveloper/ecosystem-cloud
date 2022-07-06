const Router = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const config = require('config');
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

router.post('/login', async (req, res) => {
  try {
    const {email, password} = req.body;
    const user = await User.findOne({email});

    if (!user) {
      return res.status(404).json({message: 'Не найден аккаунт с данным адресом эл. почты'});
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);

    if (!isPasswordValid) {
      return res.status(404).json({message: 'Неверный пароль'});
    }

    const token = jwt.sign({id: user.id}, config.get('secretKey'), {expiresIn: '1h'});

    return res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        diskSpace: user.diskSpace,
        usedSpace: user.usedSpace,
        avatar: user.avatar
      }
    })
  } catch (e) {
    console.log(e);
    res.send({message: 'Произошла ошибка на сервере'});
  }
});


module.exports = router;
