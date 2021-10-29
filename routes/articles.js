const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const { getArticles, createArticle, deleteArticle } = require('../controllers/articles');

function validateUrl(string) {
  if (!validator.isURL(string)) {
    throw new Error('Invalid URL');
  }
  return string;
}

const authValidation = Joi.object()
  .keys({
    authorization: Joi.string().required(),
  })
  .unknown(true);

router.get(
  '/',
  celebrate({
    headers: authValidation,
  }),
  getArticles
);

router.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      keyword: Joi.string().required(),
      title: Joi.string().required(),
      text: Joi.string().required(),
      date: Joi.string().required(),
      source: Joi.string().required(),
      link: Joi.string().required().custom(validateUrl),
      image: Joi.string().required(),
    }),
    headers: authValidation,
  }),
  createArticle
);

router.delete(
  '/:articleId',
  celebrate({
    params: Joi.object().keys({
      articleId: Joi.string().hex().length(24),
    }),
    headers: authValidation,
  }),
  deleteArticle
);

module.exports = router;
