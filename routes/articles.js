const articles = require('express').Router();

const { celebrate, Joi } = require('celebrate');

const  { getArticles, createArticle, removeArticle } = require('../controllers/articles');


articles.get('/', getArticles);

articles.post('/', createArticle);

articles.delete('/:articleId', removeArticle);

module.exports = articles;