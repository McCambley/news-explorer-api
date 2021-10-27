const express = require('express');

const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const users = require('./routes/users');
const articles = require('./routes/articles');
const auth = require('./middleware/auth');
const { requestLogger, errorLogger } = require('./middleware/logger');

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/newsexplorer', {});
app.use(cors());
app.use(express.json());

app.use(requestLogger);

app.use(auth);

app.use('/users', users);
app.use('/articles', articles);

app.use(errorLogger);

app.listen(PORT, () => {
  console.log(`Chirpin' on ${PORT}`);
});
