const users = require('express').Router();

const { celebrate, Joi } = require('celebrate');

users.get('/me', (req,res) => {
  res.send('get the user');
});

module.exports = users;