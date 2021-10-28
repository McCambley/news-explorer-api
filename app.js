const express = require('express');
const helmet = require('helmet');
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const { errors } = require('celebrate');

// middleware
const { requestLogger, errorLogger } = require('./middleware/logger');
const error = require('./middleware/error');
const auth = require('./middleware/auth');

// routes
const users = require('./routes/users');
const articles = require('./routes/articles');
const signin = require('./routes/signin');
const signup = require('./routes/signup');

// helpers
const limiter = require('./helpers/limiter');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/newsexplorer', {});

app.use(cors());
app.options('*', cors());
app.use(helmet());
app.use(express.json());

// log requests
app.use(requestLogger);

// limit requests
app.use(limiter);

app.use('/signup', signup);
app.use('/signin', signin);

// protect routes
app.use(auth);

app.use('/users', users);
app.use('/articles', articles);

// log errors
app.use(errorLogger);

// celebrate
app.use(errors());

// middleware
app.use(error);

app.listen(PORT, () => {
  console.log(`Listenin' on ${PORT}`);
});
