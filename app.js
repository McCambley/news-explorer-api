const express = require('express');
const helmet = require('helmet');
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const { errors } = require('celebrate');

// middleware
const { requestLogger, errorLogger } = require('./middleware/logger');
const error = require('./middleware/error');
// const auth = require('./middleware/auth');

// // routes
const mainRoute = require('./routes/index');

// helpers
const limiter = require('./helpers/limiter');

const { PORT = 3000, MONGO_URL, NODE_ENV } = process.env;
const app = express();

mongoose.connect(NODE_ENV === 'production' ? MONGO_URL : 'mongodb://localhost:27017/newsexplorer');

app.use(cors());
app.options('*', cors());
app.use(helmet());
app.use(express.json());

// log requests
app.use(requestLogger);

// limit requests
app.use(limiter);

// routing
app.use('/', mainRoute);

// log errors
app.use(errorLogger);

// celebrate
app.use(errors());

// middleware
app.use(error);

app.listen(PORT, () => {
  console.log(`Listenin' on ${PORT}`);
});
