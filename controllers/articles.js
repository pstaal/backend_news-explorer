const Article = require('../models/article');

const getArticles = (req,res) => {
  Article.find({})
    .then(article => res.send({ data: article }))
    .catch(err => res.status(500).send({ message: 'Error' }));
};

const createArticle = (req, res) => {
  const { keyword, title, text, date, source, link, image } = req.body;
  const owner = req.user._id;

  Article.create({ keyword, title, text, date, source, link, image, owner })
    .then(article => res.send({ data: article }))
    .catch(err => res.status(500).send({ message: 'Error' }));

};

const removeArticle = (req,res) => {
  Article.findByIdAndRemove(req.params.articleId)
    .then(article => res.send({ data: article }))
    .catch(err => res.status(500).send({ message: 'Error' }));
};

module.exports = {
  getArticles,
  createArticle,
  removeArticle
};