const router = require('express').Router();
const users = require('./users');
const articles = require('./articles');
const auth = require('../middleware/auth');
const { signupValidation, loginValidation } = require('../middleware/validate');

const {
  login,
  createUser,
} = require('../controllers/users');

router.post('/signup', signupValidation, createUser);

router.post('/signin', loginValidation, login);

router.use(auth);

router.use('/articles', articles);
router.use('/users', users);

module.exports = router;
