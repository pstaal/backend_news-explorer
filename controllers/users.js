const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { NODE_ENV, JWT_SECRET } = process.env;

const getUser = (req,res) => {
  User.findById(req.user._id)
  .then(user => res.send({ data: user }))
  .catch(err => res.status(500).send({ message: 'Error' }));
};

const createUser = (req, res) => {
  const { email, password, name } = req.body;
  bcrypt.hash(password, 10)
  .then((hash) => {
    User.create({ email, password: hash, name})
  })
  .then((user) => res.send(user))
  .catch((err) => res.status(400).send(err));
};

const login = (req,res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {

      // we're creating a token
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });

      // we return the token
      res.send({ token });
    })
    .catch((err) => {
            // authentication error
      res
        .status(401)
        .send({ message: err.message });
    });

};

module.exports = { getUser, createUser, login };