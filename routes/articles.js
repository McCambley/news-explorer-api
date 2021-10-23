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

// TODO validate the auth token
router.get('/', getArticles);

router.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      keyword: Joi.string().required(),
      title: Joi.string().required(),
      text: Joi.string().required(),
      date: Joi.string().required(),
      link: Joi.string().required(),
      image: Joi.string().required(),
    }),
  }),
  createArticle
);

router.delete(
  '/:articleId',
  celebrate({
    params: Joi.object().keys({
      articleId: Joi.string().hex().length(24),
    }),
  }),
  deleteArticle
);

module.exports = router;

// const articleSchema = new Schema({
//     keyword: {
//       type: String,
//       required: true,
//     },
//     title: {
//       type: String,
//       required: true,
//     },
//     text: {
//       type: String,
//       required: true,
//     },
//     date: {
//       type: String,
//       required: true,
//     },
//     source: {
//       type: String,
//       required: true,
//     },
//     link: {
//       type: String,
//       required: true,
//     },
//     image: {
//       type: String,
//       required: true,
//     },
//     owner: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'user',
//       required: true,
//       select: false,
//     },
//   });
