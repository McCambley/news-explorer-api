const User = require('../models/user');

const getUser = (req, res) => {
  res.send({ data: 'You did it!' });
};

module.exports = { getUser };
