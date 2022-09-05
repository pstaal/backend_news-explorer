const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { NODE_ENV, JWT_SECRET } = process.env;
const NotFoundError = require('../errors/not-found-error');
const BadRequestError = require('../errors/bad-request-error');
const ConflictError = require('../errors/conflict-error');
const InternalServerError = require('../errors/internal-server-error');

const getUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(new NotFoundError('No documents were found!'))
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('This is not a valid ID'));
      }
      next(new InternalServerError('An error has occurred with the server'));
    });
};

const createUser = (req, res, next) => {
  const { email, password, name } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({ email, password: hash, name });
    })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') return next(new NotFoundError('Could not find the document'));
      if (err.name === 'MongoError' && err.code === 11000) return next(new ConflictError('This email is already in use'));
      if (err.name === 'ValidatorError') return next(new BadRequestError(err.message));
      if (err.name === 'ValidationError') {
        return next(new BadRequestError(`${Object.values(err.errors).map((error) => error.message).join(', ')}`));
      }
      return next(new InternalServerError('An error has occurred with the server'));
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      // we're creating a token
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });

      // we return the token
      res.send({ token });
    })
    .catch(() => {
      next(new InternalServerError('An error has occurred with the server'));
    });
};

module.exports = { getUser, createUser, login };
