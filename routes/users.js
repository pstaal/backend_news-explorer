const users = require('express').Router();

const { celebrate, Joi } = require('celebrate');

const { getUser } = require('../controllers/users');

users.get('/me', getUser);

module.exports = users;