const express = require('express');
const app = express();

const { requestLogger, errorLogger } = require('./middleware/logger');

const { PORT = 3000 } = process.env;

app.use(requestLogger);

app.get('/', (req, res) => {
  res.send('Hello world');
});

app.use(errorLogger);

app.listen(PORT, () => {
  console.log(`Chirpin' on ${PORT}`);
});
