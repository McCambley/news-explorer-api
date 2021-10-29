const router = require('express').Router();
// middleware
const auth = require('../middleware/auth');

// routes
const users = require('./users');
const articles = require('./articles');
const signin = require('./signin');
const signup = require('./signup');

router.use('/signup', signup);
router.use('/signin', signin);

// protect routes
router.use(auth);

router.use('/users', users);
router.use('/articles', articles);

module.exports = router;
