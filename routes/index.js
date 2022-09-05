const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const users = require('./users');
const articles = require('./articles');
const auth = require('../middleware/auth');

const {
  login,
  createUser,
} = require('../controllers/users');

router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
    name: Joi.string().required(),
  }),
}), createUser);

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
}), login);

router.use(auth);

router.use('/articles', articles);
router.use('/users', users);

module.exports = router;
