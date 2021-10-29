const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { getUser } = require('../controllers/users');

router.get(
  '/me',
  celebrate({
    headers: Joi.object()
      .keys({
        authorization: Joi.string().required(),
      })
      .unknown(true),
  }),
  getUser
);

module.exports = router;
