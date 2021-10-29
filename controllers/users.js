const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const ErrorHandler = require('../helpers/error');

const { NODE_ENV, JWT_SECRET } = process.env;

const getUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new ErrorHandler(404, 'User not found');
      }
      res.send({ data: user });
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        return next(new ErrorHandler(400, 'Invalid userId'));
      }
      return next(error);
    });
};

const createUser = (req, res, next) => {
  const { email, password, name } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({ email, password: hash, name }))
    .then((user) => {
      res.status(201).send({ data: { name: user.name, email: user.email } });
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        return next(new ErrorHandler(400, 'Invalid inputs'));
      }
      if (error.code === 11000) {
        return next(new ErrorHandler(409, 'Conflict'));
      }
      return next(error);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' }
      );
      res.send({ token });
    })
    .catch((error) => next(new ErrorHandler(401, error.message)));
};

module.exports = { getUser, createUser, login };
