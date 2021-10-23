const Article = require('../models/article');

const getArticles = (req, res) => {
  //   res.send({ data: 'You did it!' });
  // still need to filter by user
  Article.find({})
    .then((articles) => {
      res.send({ data: articles });
    })
    .catch((error) => {
      res.status(400).send({ message: error });
    });
};

const createArticle = (req, res) => {
  // eventually owner will be decrypted from authorization token
  const { keyword, title, text, date, source, link, image, owner } = req.body;
  Article.create({ keyword, title, text, date, source, link, image, owner })
    .then((article) => article.populate('owner'))
    .then((article) => {
      res.send({ data: article });
    })
    .catch((error) => {
      res.status(400).send({ message: error });
    });
};

const deleteArticle = (req, res) => {
  // delete card
  Article.findByIdAndDelete(req.params.articleId)
    .orFail()
    .then((article) => {
      res.send({ data: article });
    })
    .catch((error) => {
      res.send({ message: error });
    });
};

module.exports = { getArticles, createArticle, deleteArticle };
