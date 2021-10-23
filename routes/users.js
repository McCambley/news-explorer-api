const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { getUser } = require('../controllers/users');

// TODO validate the auth token
router.get('/me', getUser);

module.exports = router;

// const userSchema = new Schema({
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   password: {
//     type: String,
//     minlength: 8,
//     select: false,
//   },
//   name: {
//     type: String,
//     required: true,
//     minlength: 2,
//     maxlength: 30,
//   },
// });
