const Article = require('../models/article');

const ForbiddenError = require('../errors/forbidden-error');
const BadRequestError = require('../errors/bad-request-error');
const NotFoundError = require('../errors/not-found-error');
const InternalServerError = require('../errors/internal-server-error');

const getArticles = (req, res, next) => {
  const owner = req.user._id;
  Article.find({ owner })
    .populate(['owner'])
    .then((articles) => res.send({ data: articles }))
    .catch(() => {
      next(new InternalServerError('An error has occurred with the server'));
    });
};

const createArticle = (req, res, next) => {
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;
  const owner = req.user._id;

  Article.create({
    keyword, title, text, date, source, link, image, owner,
  })
    .then((article) => res.send({ data: article }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(`${Object.values(err.errors).map((error) => error.message).join(', ')}`));
      }
      if (err.name === 'ValidatorError') {
        next(new BadRequestError(err.message));
      }
      next(new InternalServerError('An error has occurred with the server'));
    });
};

const removeArticle = (req, res, next) => {
  Article.findByIdAndRemove(req.params.articleId)
    .populate(['owner'])
    .orFail(new NotFoundError('No documents were found!'))
    .then((article) => {
      if (article.owner._id.toString() !== req.user._id) {
        return next(new ForbiddenError('You can only delete your own cards'));
      }
      return res.send({ data: article });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('This is not a valid ID'));
      }
      next(new InternalServerError('An error has occurred with the server'));
    });
};

module.exports = {
  getArticles,
  createArticle,
  removeArticle,
};
