const Article = require('../models/article');
const ErrorHandler = require('../helpers/error');

const getArticles = (req, res, next) => {
  Article.find({ owner: req.user._id })
    .then((articles) => {
      res.send({ data: articles });
    })
    .catch(next);
};

const createArticle = (req, res, next) => {
  const { keyword, title, text, date, source, link, image } = req.body;
  Article.create({ keyword, title, text, date, source, link, image, owner: req.user._id })
    .then((article) => article.populate('owner'))
    .then((article) => {
      res.send({ data: article });
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        return next(new ErrorHandler(400, 'Invalid inputs'));
      }
      return next(error);
    });
};

const deleteArticle = (req, res, next) => {
  // find card
  Article.findById(req.params.articleId)
    .orFail()
    .then((article) => {
      if (!(article.owner.toString() === req.user._id)) {
        throw new ErrorHandler(403, 'Action forbidden');
      }

      // delete the article if the above passes
      Article.findByIdAndDelete(req.params.articleId)
        .orFail()
        .then((deletedCard) => {
          res.send({ data: deletedCard });
        })
        .catch((error) => {
          if (error.name === 'CastError') {
            return next(new ErrorHandler(400, 'Invalid articleId'));
          }
          if (error.name === 'DocumentNotFoundError') {
            return next(new ErrorHandler(404, 'Article not found'));
          }
          return next(error);
        });
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        return next(new ErrorHandler(400, 'Invalid articleId'));
      }
      if (error.name === 'DocumentNotFoundError') {
        return next(new ErrorHandler(404, 'Article not found'));
      }
      return next(error);
    });
};

module.exports = { getArticles, createArticle, deleteArticle };
