const articles = require('express').Router();

const { celebrate, Joi } = require('celebrate');


articles.get('/', (req,res) => {
  res.send('get all articles');
});

articles.post('/', (req,res) => {
  res.send('get all articles');
});

articles.delete('/:articleId', (req,res) => {
  res.send('get all articles');
});

module.exports = articles;